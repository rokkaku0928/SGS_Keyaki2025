using UnityEngine;
using TMPro;
using UnityEngine.Events;
using System.Runtime.CompilerServices;

public class TimeManager : MonoBehaviour
{
    [Header("表示するTextMeshPro (UI or World)")]
    [SerializeField] private TMP_Text timerText;

    [Header("カウント設定")]
    [SerializeField] private float startSeconds = 30f; // 初期値30秒
    [SerializeField] private float warnThreshold = 10f; // 10秒を切ったら赤

    [Header("TimeUp時の挙動")]
    [SerializeField] private bool pauseOnTimeUp = true; // 0秒で Time.timeScale=0 にする
    [SerializeField] private UnityEvent onTimeUp;       // 0秒到達時に呼ばれるイベント（任意でUI表示など紐付け）

    public float timeLeft;
    private Color defaultColor;
    private bool running = true;
    private bool timeUpFired = false; // 二重発火防止
    [SerializeField] private TMP_Text FinishScore;
    [SerializeField] private GameObject FinishUI;
    [SerializeField] public kagoMoveManager kagomovemanager;

    void Start()
    {
        Time.timeScale = 1f;
        if (timerText == null)
        {
            Debug.LogError("[TimeManager] timerText が未設定です。TextMeshPro をアサインしてください。");
            enabled = false;
            return;
        }

        defaultColor = timerText.color;
        timeLeft = Mathf.Max(0f, startSeconds);
        UpdateView(force: true);
    }

    void Update()
    {
        if (!running) return;

        if (timeLeft > 0f)
        {
            timeLeft -= Time.deltaTime;
            if (timeLeft < 0f) timeLeft = 0f;
            UpdateView();
        }

        // 0秒になったら停止処理（1回だけ）
        if (timeLeft <= 0f && !timeUpFired)
        {
            TimeUp();
        }
    }

    private void TimeUp()
    {
        timeUpFired = true;
        running = false;          // このスクリプトのカウント更新を停止
        UpdateView(force: true);  // 表示を最終更新（"0"のまま）

        FinishScore.text = kagomovemanager.score.ToString();
        FinishUI.SetActive(true);

        onTimeUp?.Invoke();       // 必要ならUI表示・SE再生などをInspectorで設定

        if (pauseOnTimeUp)
        {
            Time.timeScale = 0f;  // 物理やアニメ等を一時停止
            Debug.Log("[TimeManager] Time Up! Game Paused (timeScale=0)");
        }
    }

    private void UpdateView(bool force = false)
    {
        // 数字だけ表示（小数切り上げで30,29,28...と減る）
        int display = Mathf.CeilToInt(timeLeft);
        if (force || timerText.text != display.ToString())
            timerText.text = display.ToString();

        // 残り10秒「未満」で赤、それ以外は元の色
        timerText.color = (timeLeft < warnThreshold) ? Color.red : defaultColor;
    }

    // ★任意：外部から再スタートしたいとき用（UIボタン等に割り当て可能）
    public void RestartTimer(float seconds)
    {
        Time.timeScale = 1f;   // 一時停止解除（必要なら）
        timeLeft = Mathf.Max(0f, seconds);
        running = true;
        timeUpFired = false;
        UpdateView(force: true);
    }
}
