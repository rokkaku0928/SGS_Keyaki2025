using UnityEngine;
using TMPro;

public class kagoMoveManager : MonoBehaviour
{
    [SerializeField] float speed = 3f;     // 速度（単位/秒）
    [SerializeField] float minX = -2.1f;   // x 下限
    [SerializeField] float maxX = 2.1f;   // x 上限

    [Header("表示するTextMeshPro (UI or World)")]
    [SerializeField] public TMP_Text scoreText;

    public int score = 0;        // スコア
    float fixedY;         // 固定する y
    bool holdLeft;        // 左ボタンを押下中（UI）
    bool holdRight;       // 右ボタンを押下中（UI）

    void Awake()
    {
        fixedY = transform.position.y; // 現在の y を固定値に
        UpdateScoreUI();               // 初期表示（0）
    }

    void Update()
    {
        float dir = 0f;

        // --- UIボタンの入力 ---
        if (holdLeft) dir -= 1f;
        if (holdRight) dir += 1f;

        // --- キーボードの入力（矢印キー）---
        if (Input.GetKey(KeyCode.LeftArrow)) dir -= 1f;
        if (Input.GetKey(KeyCode.RightArrow)) dir += 1f;

        // （任意）A/D キーでも動かしたい場合は下を有効化
        // if (Input.GetKey(KeyCode.A)) dir -= 1f;
        // if (Input.GetKey(KeyCode.D)) dir += 1f;

        // 速度反映
        if (dir != 0f)
        {
            // -2, -1, 1, 2 などになり得るが、速度はdirの符号だけ使いたければ下記を使用：
            // dir = Mathf.Sign(dir);
            float newX = transform.position.x + dir * speed * Time.deltaTime;
            newX = Mathf.Clamp(newX, minX, maxX);
            transform.position = new Vector3(newX, fixedY, transform.position.z);
        }
        else
        {
            // 念のため y を固定
            if (transform.position.y != fixedY)
            {
                var p = transform.position;
                p.y = fixedY;
                transform.position = p;
            }
        }
    }

    // ==== UI から呼ぶメソッド（Event Trigger 用） ====
    public void OnLeftDown() { holdLeft = true; }
    public void OnLeftUp() { holdLeft = false; }
    public void OnRightDown() { holdRight = true; }
    public void OnRightUp() { holdRight = false; }

    // ===== 衝突検知（2D: Collision 版）=====
    void OnCollisionEnter2D(Collision2D collision)
    {
        var go = collision.gameObject;

        if (go.CompareTag("Apple"))
        {
            AddScore(1);
            Destroy(go);
        }
        else if (go.CompareTag("GApple"))
        {
            AddScore(2);
            Destroy(go);
        }
        else if (go.CompareTag("Bug"))
        {
            AddScore(-1); // 0未満にならないよう AddScore 内でクランプ
            Destroy(go);
        }
        else
        {
            Debug.Log("Unknown Tag: " + go.tag);
        }
    }

    // ===== スコア操作 =====
    void AddScore(int delta)
    {
        score = Mathf.Max(0, score + delta); // 0未満にしない
        UpdateScoreUI();
    }

    void UpdateScoreUI()
    {
        if (scoreText != null) scoreText.text = score.ToString(); // 数字だけ
        else Debug.LogWarning("[kagoMoveManager] scoreText が未設定です。");
    }
}
