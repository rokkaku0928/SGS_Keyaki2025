using UnityEngine;
using System.Collections;

public class ItemManager : MonoBehaviour
{
    [Header("Prefabs")]
    [SerializeField] GameObject prefabA;
    [SerializeField] GameObject prefabB;
    [SerializeField] GameObject prefabC;

    [Header("Spawn Weights (自由比率: 合計1でなくてもOK)")]
    [SerializeField, Min(0f)] float weightA = 0.6f; // 既定: 60%
    [SerializeField, Min(0f)] float weightB = 0.2f; // 既定: 20%
    [SerializeField, Min(0f)] float weightC = 0.2f; // 既定: 20%

    [Header("Spawn Area (2D)")]
    [SerializeField] float xMin = -2.1f;
    [SerializeField] float xMax = 2.1f;
    [SerializeField] float yMin = 1.3f;  // 低い方
    [SerializeField] float yMax = 3.1f;  // 高い方
    [SerializeField] float z = 0f;        // 2Dなら通常 0

    [Header("Timing")]
    [SerializeField] bool startOnAwake = true;
    [SerializeField, Min(0f)] float spawnInterval = 1.1f; // 一定間隔(秒)
    [SerializeField] bool randomizeInterval = false;      // trueなら下記範囲でランダム
    [SerializeField, Min(0f)] float minInterval = 0.5f;
    [SerializeField, Min(0f)] float maxInterval = 1.5f;

    [Header("Parent (任意)")]
    [SerializeField] Transform parent; // ここに生成して階層を整理
    [SerializeField] TimeManager timeManager;
    private float flagTime = 30.0f;

    Coroutine loop;

    void Awake()
    {
        if (startOnAwake) loop = StartCoroutine(SpawnLoop());
    }

    public void StartSpawning()
    {
        if (loop == null) loop = StartCoroutine(SpawnLoop());
    }

    public void StopSpawning()
    {
        if (loop != null) { StopCoroutine(loop); loop = null; }
    }

    IEnumerator SpawnLoop()
    {
        while (true)
        {
            SpawnOnce();
            flagTime = timeManager.timeLeft;
            if (flagTime < 10.0f)
            {
                spawnInterval = 0.4f;
            }
            else if (flagTime < 20.0f)
            {
                spawnInterval = 0.7f;
            }
            else spawnInterval = 0.9f;
            float wait = spawnInterval;
            if (randomizeInterval)
                wait = Random.Range(Mathf.Min(minInterval, maxInterval),
                                    Mathf.Max(minInterval, maxInterval));
            yield return new WaitForSeconds(wait);
        }
    }

    void SpawnOnce()
    {
        var prefab = PickPrefab();
        if (!prefab) return;

        float minX = Mathf.Min(xMin, xMax);
        float maxX = Mathf.Max(xMin, xMax);
        float minY = Mathf.Min(yMin, yMax);
        float maxY = Mathf.Max(yMin, yMax);

        var pos = new Vector3(Random.Range(minX, maxX),
                              Random.Range(minY, maxY),
                              z);

        Instantiate(prefab, pos, Quaternion.identity, parent);
    }

    GameObject PickPrefab()
    {
        float a = Mathf.Max(0f, weightA);
        float b = Mathf.Max(0f, weightB);
        float c = Mathf.Max(0f, weightC);
        float total = a + b + c;
        if (total <= 0f) return prefabA ?? prefabB ?? prefabC; // どれか1つでも返す

        float r = Random.value * total;
        if (r < a) return prefabA;
        r -= a;
        if (r < b) return prefabB;
        return prefabC;
    }
}
