import QuestionSelectModal from "@/components/pages/admin/tasks/register/QuestionSelectModal ";
import { screen, render, fireEvent } from "@testing-library/react";

// Todo: 非同期関数実装後に自動テストの追加・修正の必要あり

// モーダル展開用関数
const open = () => {
  render(<QuestionSelectModal />);
  fireEvent.click(screen.getByRole("button"));
}

describe("UserSelectModal.tsx", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    open();
  })

  describe("スナップショットテスト", () => {
    it("モーダルを開いている状態", () => {
      const { container } = render(<QuestionSelectModal />);
      expect(container).toMatchSnapshot();
    });
  })

  describe("入力テスト", () => {
    it("検索ボックスの入力テスト", async () => {
      render(<QuestionSelectModal />);
      const input = screen.getByTestId("search-box") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "案件" } });
      expect(input.value).toBe("案件");
    });
  })
})
