import React from "react";
import { X, Save } from "lucide-react";

interface ProjectFormModalProps {
  showForm: boolean;
  setShowForm: (b: boolean) => void;
  projectName: string;
  setProjectName: (v: string) => void;
  projectLink: string;
  setProjectLink: (v: string) => void;
  formError: string | null;
  setFormError: (v: string | null) => void;
  handleAddProject: (e: React.FormEvent) => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>; // <-- perbaikan di sini
  borderColor: string;
  cardBg: string;
  boxShadow: string;
}

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  showForm,
  setShowForm,
  projectName,
  setProjectName,
  projectLink,
  setProjectLink,
  formError,
  setFormError,
  handleAddProject,
  nameInputRef,
  borderColor,
  cardBg,
  boxShadow,
}) =>
  !showForm ? null : (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={() => setShowForm(false)}
    >
      <div
        className={`relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto p-6 rounded-lg shadow-2xl border-2 ${borderColor} ${cardBg} animate-fade-in`}
        style={{ boxShadow, minWidth: 260 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Tutup"
          type="button"
          className="absolute top-3 right-3 z-10 rounded-full bg-black text-yellow-400 border-2 border-yellow-400 p-1 hover:bg-yellow-400 hover:text-black hover:border-black transition-all"
          onClick={() => {
            setShowForm(false);
            setFormError(null);
            setProjectName("");
            setProjectLink("");
          }}
          style={{ width: 32, height: 32 }}
        >
          <X size={17} />
        </button>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleAddProject}
          autoComplete="off"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-yellow-400 uppercase tracking-wider">
              Nama Project
            </label>
            <input
              ref={nameInputRef}
              className={`rounded-md px-3 py-2 border ${borderColor} focus:outline-yellow-400 ${cardBg} text-yellow-400 text-base shadow-inner placeholder:text-yellow-400/70`}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Nama project..."
              required
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-yellow-400 uppercase tracking-wider">
              Link Project
            </label>
            <input
              className={`rounded-md px-3 py-2 border ${borderColor} focus:outline-yellow-400 ${cardBg} text-yellow-400 text-base shadow-inner placeholder:text-yellow-400/70`}
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              placeholder="https://your-project.com"
              required
              autoComplete="off"
              type="url"
              pattern="https?://.*"
            />
          </div>
          <div className="flex flex-row gap-2 w-full justify-end mt-1">
            <button
              type="submit"
              aria-label="Simpan"
              className={`rounded-xl flex items-center justify-center shadow-lg transition-all duration-150 border-2 border-yellow-400 bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 hover:border-black p-2`}
              style={{ width: 42, height: 42 }}
            >
              <Save size={20} />
            </button>
          </div>
          {formError && (
            <div className="w-full mt-1 text-center text-yellow-400 text-xs font-medium">
              {formError}
            </div>
          )}
        </form>
      </div>
    </div>
  );

export default ProjectFormModal;
