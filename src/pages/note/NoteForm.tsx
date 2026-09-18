import {
  useEffect,
  useState,
} from "react";

import Button from "../../components/Button";

import type {
  NoteFormData,
} from "../../types/noteTypes";

interface Props {
  initialValue?: string;

  loading?: boolean;

  submitLabel?: string;

  onSubmit: (
    data: NoteFormData
  ) => Promise<void>;

  onCancel: () => void;
}

const NoteForm = ({
  initialValue = "",
  loading = false,
  submitLabel = "Add Note",
  onSubmit,
  onCancel,
}: Props) => {
  const [
    content,
    setContent,
  ] = useState(
    initialValue
  );

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    setContent(
      initialValue
    );
  }, [initialValue]);

  const handleSubmit =
    async (
      event:
        React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      if (
        !content.trim()
      ) {
        setError(
          "Note content is required"
        );

        return;
      }

      if (
        content.trim()
          .length < 3
      ) {
        setError(
          "Note must contain at least 3 characters"
        );

        return;
      }

      setError("");

      await onSubmit({
        content:
          content.trim(),
      });
    };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-4"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Note
        </label>

        <textarea
          value={content}
          onChange={(
            event
          ) => {
            setContent(
              event.target
                .value
            );

            if (error) {
              setError("");
            }
          }}
          rows={6}
          placeholder="Write your note here..."
          className={`w-full resize-none rounded-lg border p-3 text-sm text-slate-700 outline-none transition focus:ring-2 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-blue-100"
          }`}
        />

        <div className="mt-1 flex items-center justify-between">
          {error ? (
            <p className="text-xs text-red-500">
              {error}
            </p>
          ) : (
            <span />
          )}

          <p className="text-xs text-slate-400">
            {content.length}
            /1000
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={
            onCancel
          }
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={
            loading
          }
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;