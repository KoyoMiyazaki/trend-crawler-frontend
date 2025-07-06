import { test, expect } from "@playwright/test";

test("記事の各種情報が表示されている", async ({ page }) => {
  const mockArticle = {
    id: "1",
    url: "https://example.com/article1",
    title: "表示確認テスト",
    description: "これは説明文です。",
    source: "zenn",
    published_at: "2023-10-01T00:00:00Z",
    fetched_at: "2023-10-01T01:00:00Z",
  };
  await page.route(/\/rest\/v1\/articles(\?.*)?$/, (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([mockArticle]),
    });
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const article = page.getByRole("link", { name: mockArticle.title });
  await expect(article.getByText(mockArticle.title)).toBeVisible();
  await expect(article.getByText(mockArticle.description)).toBeVisible();
  await expect(
    article.getByText(new Date(mockArticle.published_at).toLocaleDateString())
  ).toBeVisible();
  await expect(article).toHaveAttribute("href", mockArticle.url);
});
