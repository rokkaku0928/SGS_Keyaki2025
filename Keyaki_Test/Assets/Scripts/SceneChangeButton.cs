using UnityEngine;
using UnityEngine.SceneManagement; // ← シーン管理に必要
public class SceneChangeButton : MonoBehaviour
{
    // インスペクターから遷移先のシーン名を指定
    [SerializeField] private string gamesceneName;
    [SerializeField] private string titlesceneName;

    // ボタンが押されたときに呼ぶ関数
    public void ChangeGameScene()
    {
        if (!string.IsNullOrEmpty(gamesceneName))
        {
            SceneManager.LoadScene(gamesceneName);
        }
        else
        {
            Debug.LogError("シーン名が設定されていません！");
        }
    }

    public void ChangetitleScene()
    {
        if (!string.IsNullOrEmpty(titlesceneName))
        {
            SceneManager.LoadScene(titlesceneName);
        }
        else
        {
            Debug.LogError("シーン名が設定されていません！");
        }
    }
}
