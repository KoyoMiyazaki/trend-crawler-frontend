import { test, expect } from "@playwright/test";

test("記事の取得に失敗した場合、エラーメッセージが表示される", async ({
  page,
}) => {
  await page.route(/\/rest\/v1\/articles(\?.*)?$/, (route) => {
    route.abort();
  });

  await page.goto("/");
  await expect(page.getByText("記事の取得に失敗しました。")).toBeVisible();
});
