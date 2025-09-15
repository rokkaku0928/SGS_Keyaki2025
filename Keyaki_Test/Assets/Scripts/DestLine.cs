using UnityEngine;

[RequireComponent(typeof(Collider2D))]
public class DestLine : MonoBehaviour
{
    [Header("必要ならタグで絞る（空なら全て消す）")]
    [SerializeField] private bool useTagFilter = false;
    [SerializeField] private string[] targetTags = { "Apple", "GApple", "Bug" };

    void Reset()
    {
        // 置いた瞬間に Trigger 推奨設定に
        var col = GetComponent<Collider2D>();
        col.isTrigger = true;
    }

    // Trigger を使う場合（推奨）
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (!useTagFilter || HasTargetTag(other.gameObject))
        {
            Destroy(other.gameObject);
        }
    }

    // Trigger を使わず通常衝突で消したい場合はこちらも有効
    private void OnCollisionEnter2D(Collision2D collision)
    {
        var go = collision.gameObject;
        if (!useTagFilter || HasTargetTag(go))
        {
            Destroy(go);
        }
    }

    private bool HasTargetTag(GameObject go)
    {
        if (targetTags == null || targetTags.Length == 0) return true;
        foreach (var t in targetTags)
        {
            if (!string.IsNullOrEmpty(t) && go.CompareTag(t)) return true;
        }
        return false;
    }
}

