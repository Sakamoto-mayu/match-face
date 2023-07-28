"use client";
import Input from "@/components/ui/Input";
import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteButton from "@/components/ui/button/WhiteButton";
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton";
import { useState } from "react";
import { useJobsFilter } from "@/hooks/store/context/TasksContext";

// 削除予定
import { departments } from "@/const/tasks";

const SearchByJobs = () => {
  // 職種フィルター状態管理
  const [jobsFilter, setJobsFilter] = useState<string[]>([]);
  const [filterList, setFilterList] = useJobsFilter(); // context
  // 検索入力値状態管理

  const handleSetFilter = (department: string) => {
    // 職種レコードを挿入
    if (!jobsFilter.includes(department)) {
      const newArr = [...jobsFilter];
      newArr.push(department);
      setJobsFilter(newArr);
    } else {
      // 職種レコードを削除
      const newArr = jobsFilter.filter((job) => {
        return job !== department;
      });
      setJobsFilter(newArr);
    }
    // console.log("jobsFilter2", jobsFilter);
  };

  // フィルターを適用
  const handleApplyFilter = () => {
    setFilterList(jobsFilter);
  };

  return (
    <div className="flex flex-col items-center border-2 rounded-md w-3/6 mx-auto mt-6 p-3">
      <div className="flex items-center mb-4">
        <Input id="search" className="border-light-gray text-xs p-1 w-96" />
        <WhiteButton label="検索" className="text-xs ml-2" />
      </div>
      <div className="flex items-center mb-4">
        {/* ToDo: 職種データを非同期通信でGET */}
        {departments.map((department) => {
          return (
            <div key={department.id} className="mx-3">
              <WhiteCheckButton
                label={department.name}
                className="text-xs w-16"
                onClick={() => handleSetFilter(department.name)}
              />
            </div>
          );
        })}
      </div>
      <div>
        <OrangeButton
          label="絞り込み"
          className="w-28 text-sm"
          onClick={handleApplyFilter}
        />
      </div>
    </div>
  );
};

export default SearchByJobs;
