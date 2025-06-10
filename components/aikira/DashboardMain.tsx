"use client";
import React, { useEffect, useRef, useState } from "react";
import { ToggleLeft, ToggleRight, Plus } from "lucide-react";
import AboutCard from "./AboutCard";
import OrbitScrollbar from "./OrbitScrollbar";
import ProjectList from "./ProjectList";
import ProjectFormModal from "./ProjectFormModal";
import PasswordModal from "./PasswordModal";
import ContactTree from "./ContactTree";

const PAGES = [
  {
    id: 1,
    darkBg:
      "bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.22)_0%,#000_55%)]",
    lightBg:
      "bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.13)_0%,#fff_65%)]",
  },
  {
    id: 2,
    title: "PROJECT",
    darkBg:
      "bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.18)_0%,#000_65%)]",
    lightBg:
      "bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.11)_0%,#fff_70%)]",
  },
  {
    id: 3,
    title: "CONTACT",
    darkBg:
      "bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.20)_0%,#000_60%)]",
    lightBg:
      "bg-[radial-gradient(circle_at_70%_50%,rgba(0,0,0,0.10)_0%,#fff_75%)]",
  },
];

const SCROLL_SPEED = 2;
const PROJECT_PASSWORD = "aikira3105";

type ProjectType = {
  name: string;
  link: string;
  icon: "bot" | "bot-message";
};

const DashboardMain = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(true);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // Password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<"add" | "delete" | null>(
    null
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  // Refs for focus
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showPasswordModal) {
      setTimeout(() => passwordInputRef.current?.focus(), 180);
    }
  }, [showPasswordModal]);
  useEffect(() => {
    if (showForm) {
      setTimeout(() => nameInputRef.current?.focus(), 180);
    }
  }, [showForm]);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY * SCROLL_SPEED;
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollLeft, clientWidth } = container;
      const index = Math.round(scrollLeft / clientWidth);
      setScrollIndex(index);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Safe fetch with error check
  useEffect(() => {
    fetch("/api/project")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          let msg: string;
          try {
            const err = JSON.parse(text);
            msg = err.error || text;
          } catch {
            msg = text;
          }
          throw new Error(`API error: ${res.status} - ${msg}`);
        }
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setApiError(null);
      })
      .catch((err) => {
        setProjects([]);
        setApiError("Gagal mengambil data project: " + err.message);
      });
  }, []);

  const handleOrbitClick = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      left: idx * container.clientWidth,
      behavior: "smooth",
    });
  };

  // Show password modal for add
  const handleShowAddModal = () => {
    setPasswordInput("");
    setPasswordError(null);
    setShowPasswordModal(true);
    setPendingAction("add");
  };

  // Show password modal for delete
  const handleShowDeleteModal = (idx: number) => {
    setPasswordInput("");
    setPasswordError(null);
    setShowPasswordModal(true);
    setPendingAction("delete");
    setDeleteIdx(idx);
  };

  // Password modal submit
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    if (passwordInput === PROJECT_PASSWORD) {
      if (pendingAction === "add") {
        setShowPasswordModal(false);
        setShowForm(true);
        setTimeout(() => {
          nameInputRef.current?.focus();
        }, 180);
      } else if (pendingAction === "delete" && deleteIdx !== null) {
        setShowPasswordModal(false);
        const project = projects[deleteIdx];
        await fetch("/api/project", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: project.name }),
        });
        setProjects((prev) => prev.filter((_, i) => i !== deleteIdx));
        setDeleteIdx(null);
      }
    } else {
      setPasswordError("Sandi salah!");
    }
  };

  // Add project form submit (improved: only add if POST success)
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!projectName.trim() || !projectLink.trim()) {
      setFormError("Nama dan link project wajib diisi!");
      return;
    }
    try {
      new URL(projectLink.trim());
    } catch {
      setFormError("Link project harus berupa URL yang valid!");
      return;
    }
    const icon: ProjectType["icon"] =
      Math.random() > 0.5 ? "bot" : "bot-message";
    const newProject = {
      name: projectName.trim(),
      link: projectLink.trim(),
      icon,
    };
    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (!res.ok) {
        const err = await res.json();
        setFormError(err.error || "Gagal menyimpan project.");
        return;
      }
      const savedProject = await res.json();
      setProjects((prev) => [...prev, savedProject]);
      setProjectName("");
      setProjectLink("");
      setShowForm(false);
      setFormError(null);
    } catch (err: any) {
      setFormError("Gagal menyimpan project: " + err.message);
    }
  };

  const textColor = dark ? "text-white" : "text-black";
  const mainBg = dark ? "bg-black" : "bg-neutral-100";
  const cardBg = dark ? "bg-[#181818]" : "bg-white";
  const borderColor = dark ? "border-yellow-400" : "border-black";
  const boxShadow = dark
    ? "0 2px 12px 0 rgba(251,191,36,0.10), 0 1.5px 2.5px 0 rgba(251,191,36,0.13)"
    : "0 4px 24px 0 rgba(0,0,0,0.08), 0 1.5px 2.5px 0 rgba(251,191,36,0.13)";
  const btnBase =
    "rounded-xl flex items-center justify-center shadow-lg transition-all duration-150 border-2 focus:outline-none focus:ring-2 focus:ring-yellow-400";
  const transition = "transition-colors duration-300";

  return (
    <div
      className={`h-screen overflow-hidden ${mainBg} ${transition} relative`}
    >
      {/* Toggle mode */}
      <button
        aria-label="Toggle Dark/Light Mode"
        className={`absolute top-5 right-5 z-10 p-2 rounded-full shadow-lg bg-opacity-60 ${
          dark ? "bg-[#181818]" : "bg-[#f3f3f3]"
        }`}
        onClick={() => setDark((v) => !v)}
      >
        {dark ? (
          <ToggleLeft size={28} color="#facc15" />
        ) : (
          <ToggleRight size={28} color="#222" />
        )}
      </button>

      {/* Konten */}
      <div
        ref={containerRef}
        className="flex h-full overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* PAGE 0: ABOUT */}
        <div
          key={PAGES[0].id}
          className={
            `min-w-full h-full flex flex-col items-center justify-center ${transition} ` +
            (dark ? PAGES[0].darkBg : PAGES[0].lightBg)
          }
        >
          <AboutCard dark={dark} />
        </div>
        {/* PAGE 1: PROJECT */}
        <div
          key={PAGES[1].id}
          className={
            `min-w-full h-full flex flex-col items-center justify-start pt-20 ${transition} ` +
            (dark ? PAGES[1].darkBg : PAGES[1].lightBg)
          }
        >
          {/* Tombol Tambah Project */}
          <div className="w-full max-w-lg flex justify-end mb-6 pr-5">
            <button
              aria-label="Tambah Project"
              className={`${btnBase} border-yellow-400 bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 hover:border-black p-2`}
              onClick={handleShowAddModal}
              style={{
                boxShadow,
                width: 46,
                height: 46,
              }}
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Modal Password */}
          <PasswordModal
            showPasswordModal={showPasswordModal}
            setShowPasswordModal={setShowPasswordModal}
            passwordInput={passwordInput}
            setPasswordInput={setPasswordInput}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            handlePasswordSubmit={handlePasswordSubmit}
            borderColor={borderColor}
            cardBg={cardBg}
            boxShadow={boxShadow}
            passwordInputRef={passwordInputRef}
            setPendingAction={setPendingAction}
            setDeleteIdx={setDeleteIdx}
          />

          {/* Modal Form Project */}
          <ProjectFormModal
            showForm={showForm}
            setShowForm={setShowForm}
            projectName={projectName}
            setProjectName={setProjectName}
            projectLink={projectLink}
            setProjectLink={setProjectLink}
            formError={formError}
            setFormError={setFormError}
            handleAddProject={handleAddProject}
            nameInputRef={nameInputRef}
            borderColor={borderColor}
            cardBg={cardBg}
            boxShadow={boxShadow}
          />

          {/* Daftar Project */}
          <ProjectList
            projects={projects}
            handleShowDeleteModal={handleShowDeleteModal}
            borderColor={borderColor}
            cardBg={cardBg}
            boxShadow={boxShadow}
            apiError={apiError}
            dark={dark}
          />
        </div>
        {/* PAGE 2: CONTACT */}
        <div
          key={PAGES[2].id}
          className={
            `min-w-full h-full flex items-center justify-center ${transition} ` +
            (dark ? PAGES[2].darkBg : PAGES[2].lightBg)
          }
        >
          <ContactTree dark={dark} />
        </div>
      </div>

      {/* Orbit Scrollbar */}
      <OrbitScrollbar
        dark={dark}
        scrollIndex={scrollIndex}
        handleOrbitClick={handleOrbitClick}
        pageCount={PAGES.length}
      />

      {/* === GLOBAL STYLE UNTUK ANIMASI DAN KEYFRAMES === */}
      <style jsx global>{`
        @keyframes bounceText {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-text {
          animation: bounceText 2s ease-in-out infinite;
        }
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.35s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
      `}</style>
    </div>
  );
};

export default DashboardMain;
