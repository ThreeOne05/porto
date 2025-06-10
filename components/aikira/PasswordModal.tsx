import React from "react";
import { X, Save, Lock } from "lucide-react";

interface PasswordModalProps {
  showPasswordModal: boolean;
  setShowPasswordModal: (b: boolean) => void;
  passwordInput: string;
  setPasswordInput: (v: string) => void;
  passwordError: string | null;
  setPasswordError: (v: string | null) => void;
  handlePasswordSubmit: (e: React.FormEvent) => void;
  borderColor: string;
  cardBg: string;
  boxShadow: string;
  passwordInputRef: React.RefObject<HTMLInputElement | null>; // <-- perbaikan di sini
  setPendingAction: (v: "add" | "delete" | null) => void;
  setDeleteIdx: (v: number | null) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  showPasswordModal,
  setShowPasswordModal,
  passwordInput,
  setPasswordInput,
  passwordError,
  setPasswordError,
  handlePasswordSubmit,
  borderColor,
  cardBg,
  boxShadow,
  passwordInputRef,
  setPendingAction,
  setDeleteIdx,
}) =>
  !showPasswordModal ? null : (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={() => setShowPasswordModal(false)}
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
            setShowPasswordModal(false);
            setPasswordInput("");
            setPasswordError(null);
            setPendingAction(null);
            setDeleteIdx(null);
          }}
          style={{ width: 32, height: 32 }}
        >
          <X size={17} />
        </button>
        <form
          className="flex flex-col gap-5"
          onSubmit={handlePasswordSubmit}
          autoComplete="off"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-yellow-400 uppercase tracking-wider flex items-center gap-2">
              <Lock size={16} /> Masukkan Sandi
            </label>
            <input
              ref={passwordInputRef}
              className={`rounded-md px-3 py-2 border ${borderColor} focus:outline-yellow-400 ${cardBg} text-yellow-400 text-base shadow-inner placeholder:text-yellow-400/70`}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Sandi"
              required
              autoComplete="off"
              type="password"
            />
          </div>
          <div className="flex flex-row gap-2 w-full justify-end mt-1">
            <button
              type="submit"
              aria-label="Lanjutkan"
              className={`rounded-xl flex items-center justify-center shadow-lg transition-all duration-150 border-2 border-yellow-400 bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 hover:border-black p-2`}
              style={{ width: 42, height: 42 }}
            >
              <Save size={20} />
            </button>
          </div>
          {passwordError && (
            <div className="w-full mt-1 text-center text-yellow-400 text-xs font-medium">
              {passwordError}
            </div>
          )}
        </form>
      </div>
    </div>
  );

export default PasswordModal;
