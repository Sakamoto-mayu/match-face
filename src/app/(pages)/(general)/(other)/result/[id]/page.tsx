import { AnswerContent } from "./answerContent";

const ResultPage = ({ params }: { params: { project_id: number } }) => {
  const user_id = "user1";

  return (
    <div className="flex flex-col items-center">
      <AnswerContent user_id={user_id} project_id={params.project_id} />
    </div>
  );
};

export default ResultPage;
