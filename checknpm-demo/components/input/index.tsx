import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Npm } from "@/types/npm";
import npms from "../npms";

interface Props {
  setNpms: Dispatch<SetStateAction<Npm[]>>;
}
export default function ({ setNpms }: Props) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const generateNpm = async function () {
    const params = {
      description: description,
    };
    setLoading(true);
    const result = await fetch("/api/gen-npm", {
      method: "POST",
      body: JSON.stringify(params),
    });
    const { data } = await result.json();
    setLoading(false);

    if (data) {
      console.log("new npm:", data);
      setNpms((npms: Npm[]) => [data, ...npms]);
    }
  };

  const handleSubmit = async function () {
    console.log("current", description);
    if (!description) {
      alert("npm包名不能为空");
      return;
    }
    await generateNpm();
  };
  return (
    <div className=" max-w-xl mx-auto flex items-center">
      <Input
        type="text"
        placeholder="请输入待检测的软件包"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
      <Button className="ml-4" onClick={handleSubmit} disabled={loading}>
        {loading ? "检测中..." : "Check"}
      </Button>
    </div>
    
  );
}
