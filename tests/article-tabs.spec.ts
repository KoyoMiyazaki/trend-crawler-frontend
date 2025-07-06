import { sources } from "@/lib/sources";
import { test, expect } from "@playwright/test";

test("記事取得元のタブが表示されている", async ({ page }) => {
  const tabs = [
    "すべて",
    ...Object.values(sources).map((source) => source.label),
  ];

  await page.goto("/");
  for (const tab of tabs) {
    await expect(page.getByRole("tab", { name: tab })).toBeVisible();
  }
});

test("タブを切り替えて記事を確認する", async ({ page }) => {
  await page.route(/\/rest\/v1\/articles(\?.*)?$/, (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          id: "1",
          url: "https://example.com/article1",
          title: "Zenn記事タイトル",
          description: "Zenn記事の説明",
          source: "zenn",
          published_at: "2023-10-01T00:00:00Z",
          fetched_at: "2023-10-01T01:00:00Z",
        },
        {
          id: "2",
          url: "https://example.com/article2",
          title: "Qiita記事タイトル",
          description: "Qiita記事の説明",
          source: "qiita",
          published_at: "2023-10-02T00:00:00Z",
          fetched_at: "2023-10-02T01:00:00Z",
        },
      ]),
    });
  });

  // すべてタブで確認
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(
    page.getByRole("link", { name: /Zenn記事タイトル/ })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Qiita記事タイトル/ })
  ).toBeVisible();

  // Zennタブで確認
  await page.getByRole("tab", { name: "Zenn" }).click();
  await page.waitForLoadState("networkidle");
  await expect(
    page.getByRole("link", { name: /Zenn記事タイトル/ })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Qiita記事タイトル/ })
  ).not.toBeVisible();

  // Qiitaタブで確認
  await page.getByRole("tab", { name: "Qiita" }).click();
  await page.waitForLoadState("networkidle");
  await expect(
    page.getByRole("link", { name: /Zenn記事タイトル/ })
  ).not.toBeVisible();
  await expect(
    page.getByRole("link", { name: /Qiita記事タイトル/ })
  ).toBeVisible();
});
