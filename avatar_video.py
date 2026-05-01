"""
アバター口パク動画合成スクリプト
- avatar_closed.png / avatar_open.png を使って口パクアニメ
- VOICEVOX で音声生成
- FFmpeg で背景動画＋アバター＋吹き出しテキストを合成
"""

import subprocess
import requests
import json
import os
import sys
import tempfile
import shutil

# ========== 設定 ==========
VOICEVOX_URL = "http://127.0.0.1:50021"
SPEAKER_ID = 3  # ずんだもん（3）。変えたい場合は変更
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
AVATAR_CLOSED = os.path.join(BASE_DIR, "avatar_closed.png")
AVATAR_OPEN   = os.path.join(BASE_DIR, "avatar_open.png")
OUTPUT_DIR    = os.path.join(BASE_DIR, "output")
FONT_PATH     = "C:/Windows/Fonts/meiryo.ttc"  # メイリオ
# ==========================

os.makedirs(OUTPUT_DIR, exist_ok=True)


def generate_voice(text: str, output_wav: str) -> bool:
    """VOICEVOXでテキストを音声合成してWAVファイルに保存"""
    try:
        # 音声クエリ生成
        res = requests.post(
            f"{VOICEVOX_URL}/audio_query",
            params={"text": text, "speaker": SPEAKER_ID}
        )
        res.raise_for_status()
        query = res.json()

        # 音声合成
        res2 = requests.post(
            f"{VOICEVOX_URL}/synthesis",
            params={"speaker": SPEAKER_ID},
            data=json.dumps(query),
            headers={"Content-Type": "application/json"}
        )
        res2.raise_for_status()

        with open(output_wav, "wb") as f:
            f.write(res2.content)
        return True
    except Exception as e:
        print(f"[VOICEVOX エラー] {e}")
        print("VOICEVOXが起動しているか確認してください。")
        return False


def get_audio_duration(wav_path: str) -> float:
    """ffprobeで音声の長さを取得"""
    result = subprocess.run(
        ["ffprobe", "-v", "quiet", "-print_format", "json",
         "-show_format", wav_path],
        capture_output=True, text=True
    )
    info = json.loads(result.stdout)
    return float(info["format"]["duration"])


def make_avatar_video(text: str, output_name: str, bg_video: str = None):
    """
    テキストから口パクアバター動画を生成

    Args:
        text: 読み上げテキスト
        output_name: 出力ファイル名（拡張子なし）
        bg_video: 背景動画のパス（省略時は黒背景）
    """
    tmp_dir = tempfile.mkdtemp()
    try:
        wav_path = os.path.join(tmp_dir, "voice.wav")
        output_path = os.path.join(OUTPUT_DIR, f"{output_name}.mp4")

        print(f"[1/3] 音声生成中: {text}")
        if not generate_voice(text, wav_path):
            return False

        duration = get_audio_duration(wav_path)
        print(f"[2/3] 音声長さ: {duration:.2f}秒")

        # アバター画像をASCIIパスのtempフォルダにコピー（日本語パス対策）
        tmp_closed = os.path.join(tmp_dir, "closed.png")
        tmp_open   = os.path.join(tmp_dir, "open.png")
        shutil.copy2(AVATAR_CLOSED, tmp_closed)
        shutil.copy2(AVATAR_OPEN,   tmp_open)

        # 口パク: 0.2秒ごとに口開閉を切り替える
        fps = 30
        total_frames = int(duration * fps) + fps  # 末尾に1秒の余白
        mouth_interval = int(0.2 * fps)  # 6フレームごとに切り替え

        # フレームごとの画像リストを作る（concat demuxer用）
        concat_file = os.path.join(tmp_dir, "frames.txt")
        with open(concat_file, "w") as f:
            frame = 0
            while frame < total_frames:
                if frame < int(duration * fps):
                    img = tmp_open if (frame // mouth_interval) % 2 == 0 else tmp_closed
                else:
                    img = tmp_closed
                f.write(f"file '{img.replace(chr(92), '/')}'\n")
                f.write(f"duration {1/fps:.4f}\n")
                frame += 1
            f.write(f"file '{tmp_closed.replace(chr(92), '/')}'\n")

        print("[3/3] 動画合成中...")

        # テキストをファイルに書き出す（日本語対応）
        text_file = os.path.join(tmp_dir, "text.txt")
        with open(text_file, "w", encoding="utf-8") as f:
            f.write(text)
        text_file_escaped = text_file.replace("\\", "/").replace(":", "\\:")

        # フォントパスのエスケープ
        font_escaped = FONT_PATH.replace("\\", "/").replace(":", "\\:")

        # アバターサイズ・位置
        avatar_w = 300
        avatar_x = 20
        avatar_y = "main_h-overlay_h-20"

        # 吹き出し設定
        bubble_color = "white@0.85"
        bubble_x = avatar_x + avatar_w + 10

        if bg_video and os.path.exists(bg_video):
            inputs = ["-i", concat_file, "-i", wav_path, "-i", bg_video]
            bg_filter = f"[2:v]scale=1280:720[bg];"
        else:
            inputs = ["-i", concat_file, "-i", wav_path]
            bg_filter = "color=black:s=1280x720:d={:.2f}[bg];".format(duration + 1)

        # 吹き出し：アバター右真横（アバター下部に合わせる）
        bubble_y = 560
        bubble_h = 120
        bubble_text_y = 582

        filter_complex = (
            f"{bg_filter}"
            f"[0:v]scale={avatar_w}:-1[avatar];"
            f"[bg][avatar]overlay={avatar_x}:{avatar_y}[with_avatar];"
            f"[with_avatar]"
            f"drawbox=x={bubble_x}:y={bubble_y}:w=iw-{bubble_x+20}:h={bubble_h}:color={bubble_color}:t=fill,"
            f"drawtext=fontfile='{font_escaped}'"
            f":textfile='{text_file_escaped}'"
            f":fontcolor=black:fontsize=26"
            f":x={bubble_x+15}:y={bubble_text_y}"
            f"[out]"
        )

        cmd = [
            "ffmpeg", "-y",
            "-f", "concat", "-safe", "0",
            *inputs,
            "-filter_complex", filter_complex,
            "-map", "[out]",
            "-map", "1:a",
            "-c:v", "libx264",
            "-c:a", "aac",
            "-shortest",
            "-t", str(duration + 0.5),
            output_path
        ]

        result = subprocess.run(cmd, capture_output=True, encoding='utf-8', errors='replace')
        if result.returncode != 0:
            print("[FFmpeg エラー]")
            stderr = result.stderr or ""
            print(stderr[-2000:])
            return False

        print(f"完成: {output_path}")
        return True

    finally:
        shutil.rmtree(tmp_dir, ignore_errors=True)


if __name__ == "__main__":
    print("=== アバター口パク動画生成 ===")
    print("VOICEVOXが起動していることを確認してください。\n")

    # サンプル実行
    texts = [
        ("こんにちは！今日もゲームやっていくよ！", "intro"),
        ("このボスめっちゃ強いんだけど！", "boss"),
        ("やっと倒せた！すごくない？", "clear"),
    ]

    bg = input("背景動画のパスを入力（Enterでスキップ→黒背景）: ").strip()
    if not bg:
        bg = None

    for text, name in texts:
        print(f"\n--- {name} ---")
        make_avatar_video(text, name, bg_video=bg)

    # 全動画を1本に結合
    print("\n--- 結合中 ---")
    concat_list = os.path.join(OUTPUT_DIR, "concat_list.txt")
    with open(concat_list, "w") as f:
        for _, name in texts:
            f.write(f"file '{name}.mp4'\n")

    final_output = os.path.join(OUTPUT_DIR, "final.mp4")
    result = subprocess.run([
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0",
        "-i", concat_list,
        "-c", "copy",
        final_output
    ], capture_output=True, encoding="utf-8", errors="replace", cwd=OUTPUT_DIR)

    if result.returncode == 0:
        print(f"結合完了: {final_output}")
    else:
        print("[結合エラー]", result.stderr[-500:])

    print("\n全て完了！output/final.mp4 を確認してください。")
