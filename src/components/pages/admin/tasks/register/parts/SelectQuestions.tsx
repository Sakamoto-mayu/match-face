import Input from "@/components/ui/Input";
import WhiteButton from "@/components/ui/button/WhiteButton";
import QuestionSelectModal from "../QuestionSelectModal ";

const SelectQuestions = () => {
  return (
    <div className="mb-5">
      <div className="flex items-center mb-2">
        <p className="text-base w-40">▶質問を選択する</p>
        <div className="text-xs ml-10">
          <QuestionSelectModal />
        </div>
      </div>
      <div>
        <Input
          id="search"
          className="border-2 border-light-gray text-xs p-1 w-full"
          readOnly
        />
      </div>
    </div>
  );
};

export default SelectQuestions;
