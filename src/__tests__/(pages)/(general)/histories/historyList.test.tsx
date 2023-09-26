import { render, screen, cleanup, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockHistoriesData } from "./mock";
import HistoryList from "@/components/pages/general/histories/HistoryList";

// スナップショットテスト
describe("スナップショットテスト", () => {
  global.fetch = jest.fn().mockImplementation((url) =>
    url === "http://localhost:3000/api/histories"
      ? Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockHistoriesData),
        })
      : Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockHistoriesData),
        })
  );
  it("スナップショット", async () => {
    const { container } = render(<HistoryList />);
    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});

// 機能・インタラクションテスト
describe("HistoryListコンポーネント、初期表示", () => {
  describe("Fetch完了前のHistoryList", () => {
    it("非同期通信完了前、リストに何も表示されない", async () => {
      await waitFor(() => {
        render(<HistoryList />);
      });
      screen.debug();
      expect(screen.queryByAltText("バックエンド案件")).not.toBeInTheDocument();
    });
  });

  describe("Fetch完了後のHistoryList", () => {
    it("データ取得後、取得したデータは３つあることを確認", async () => {
      await waitFor(() => {
        render(<HistoryList />);
      });
      await waitFor(() =>
        expect(screen.getAllByText("バックエンド案件")).toHaveLength(3)
      );
    });
    it("案件詳細が30文字以上の時文字数制限がかかり、30文字以降は...の表示になっている", async () => {
      await waitFor(() => {
        render(<HistoryList />);
      });
      await waitFor(() => {
        screen.debug();
      });
      await waitFor(() => {
        const element = screen.getByTestId(
          `projectDetail${mockHistoriesData.answerRequestList[0].id}`
        );
        expect(element).toHaveTextContent("...");
      });
    });
  });
});
