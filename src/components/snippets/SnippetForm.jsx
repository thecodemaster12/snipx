import { SnippetContext } from "@/context/SnippetContex";
import { useContext, useState } from "react";

const SnippetForm = () => {
    const [isDisabled, setIsDisabled] = useState(false);
  const { addSnippet } = useContext(SnippetContext);
  const [form, setForm] = useState({
    title: "",
    language: "",
    code: "",
    tags: "",
  });

  // 1. Change error state to an object
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.language.trim()) newErrors.language = "Language is required";
    if (!form.code.trim()) newErrors.code = "Code is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsDisabled(true);

    const newSnippet = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
        await addSnippet(newSnippet);

      setForm({
        title: "",
        language: "",
        code: "",
        tags: "",
      });
    } catch (error) {
        setErrors({ api: error.message });
    } finally {
        setIsDisabled(false); // ✅ ALWAYS re-enable
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Optional: Clear error for a specific field as the user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-gray-50 font-semibold text-lg">
            Title
          </label>
          <input
            className="bg-gray-400 p-2 rounded-md"
            type="text"
            name="title"
            onChange={handleChange}
            value={form.title}
          />
          {errors.title && (
            <span className="text-red-400 text-sm font-medium">
              {errors.title}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="language"
            className="text-gray-50 font-semibold text-lg"
          >
            Language
          </label>
          <input
            className="bg-gray-400 p-2 rounded-md"
            type="text"
            name="language"
            onChange={handleChange}
            value={form.language}
          />
          {errors.language && (
            <span className="text-red-400 text-sm font-medium">
              {errors.language}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="code" className="text-gray-50 font-semibold text-lg">
            Code
          </label>
          <textarea
            className="bg-gray-400 p-2 rounded-md"
            name="code"
            onChange={handleChange}
            rows="8"
            value={form.code}
          ></textarea>
          {errors.code && (
            <span className="text-red-400 text-sm font-medium">
              {errors.code}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="tags" className="text-gray-50 font-semibold text-lg">
            Tags
          </label>
          <input
            className="bg-gray-400 p-2 rounded-md"
            type="text"
            name="tags"
            onChange={handleChange}
            placeholder="JS, debug"
            value={form.tags}
          />
        </div>
          <button
              type="submit"
              disabled={isDisabled}
              className={`py-2 px-6 rounded-md text-white ${
                  isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400"
              }`}
          >
              {isDisabled ? "Adding..." : "Add"}
          </button>
      </form>
    </>
  );
};

export default SnippetForm;
