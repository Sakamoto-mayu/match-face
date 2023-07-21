import TaskRegisterPage from "@/app/(pages)/admin/(other)/tasks/register/page";
import { render } from "@testing-library/react";
import { UserSelectProvider } from "@/hooks/store/context/UserSelectContext";

// useContextをモーダルで使用しているため、Providerを追加しています

describe('タスク一覧画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <UserSelectProvider>
        <TaskRegisterPage />
      </UserSelectProvider>
    );
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("レンダリング時", () => {
    const { container } = render(
      <UserSelectProvider>
        <TaskRegisterPage />
      </UserSelectProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
