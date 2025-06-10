import React from "react";
import Link from "next/link";
import { Bot, BotMessageSquare, Trash2, Link2 } from "lucide-react";

type ProjectType = {
  name: string;
  link: string;
  icon: "bot" | "bot-message";
};

interface ProjectListProps {
  projects: ProjectType[];
  handleShowDeleteModal: (idx: number) => void;
  borderColor: string;
  cardBg: string;
  boxShadow: string;
  apiError?: string | null;
  dark: boolean; // <-- wajib, dikirim dari DashboardMain
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  handleShowDeleteModal,
  borderColor,
  cardBg,
  boxShadow,
  apiError,
  dark,
}) => (
  <>
    {apiError && (
      <div className="col-span-full text-center text-base opacity-80 py-3 text-red-500 rounded-xl border border-red-400 bg-black/70 mb-3">
        {apiError}
      </div>
    )}
    <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 pb-8">
      {projects.map((p, idx) => {
        const Icon = p.icon === "bot" ? Bot : BotMessageSquare;
        return (
          <div
            key={p.name + idx}
            className={`relative group rounded-xl border-2 ${borderColor} px-4 py-2 shadow-lg flex items-center min-h-[48px] max-h-[62px] ${cardBg} hover:bg-yellow-400 hover:border-yellow-400 hover:scale-[1.02] transition-all duration-200`}
            style={{ boxShadow, height: 54 }}
          >
            {/* Tombol hapus */}
            <button
              type="button"
              aria-label="Hapus project"
              className="absolute top-2 right-2 z-10 rounded-full bg-yellow-400 border-2 border-black p-1 text-black hover:bg-black hover:text-yellow-400 hover:border-yellow-400 transition-all"
              onClick={() => handleShowDeleteModal(idx)}
              style={{ width: 26, height: 26 }}
            >
              <Trash2 size={13} />
            </button>
            <span
              className="inline-flex items-center justify-center rounded-full bg-yellow-400 border-2 border-black shadow text-black group-hover:bg-black group-hover:text-yellow-400 group-hover:border-black transition-all duration-200 mr-2"
              style={{
                width: 26,
                height: 26,
                fontSize: 12,
              }}
            >
              <Icon size={15} strokeWidth={2.3} />
            </span>
            <Link
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "flex items-center gap-2 truncate font-semibold group-hover:underline transition-all " +
                (dark
                  ? "text-white group-hover:text-white"
                  : "text-black group-hover:text-black")
              }
            >
              <Link2 size={15} className="text-yellow-400" />
              <span className="truncate max-w-[110px] sm:max-w-[150px] md:max-w-[110px] text-sm">
                {p.name}
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  </>
);

export default ProjectList;
