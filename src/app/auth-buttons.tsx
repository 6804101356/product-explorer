import { signIn, signOut } from "@/auth";

type AuthButtonsProps = {
  isLoggedIn: boolean;
  userName?: string | null;
};

export function AuthButtons({ isLoggedIn, userName }: AuthButtonsProps) {
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-600">
          สวัสดี {userName ?? "ผู้ใช้งาน"}
        </span>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="px-3 py-1.5 bg-slate-500 hover:bg-slate-600 text-white text-xs font-medium rounded-lg"
          >
            Logout
          </button>
        </form>
      </div>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium rounded-lg"
      >
        Login with Google
      </button>
    </form>
  );
}
