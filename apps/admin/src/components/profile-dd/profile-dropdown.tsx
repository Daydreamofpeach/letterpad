"use client";
import { animated, useSpring } from "@react-spring/web";
import classNames from "classnames";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiEdit2 } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { RxAvatar } from "react-icons/rx";
import { VscDebugStart } from "react-icons/vsc";

import { useOnClickOutside } from "../../hooks/useOnClickOutisde";

interface Session {
  name: string;
  avatar: string;
}

export const ProfileDropdown = ({
  sessionPath = `/api/client/session`,
  renderSign,
}: {
  sessionPath?: string;
  renderSign?: ReactNode;
}) => {
  const [show, setShow] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const style = useSpring({
    transform: show
      ? "translate3D(calc(-100% + 32px),0,0)"
      : "translate3D(calc(-100% + 32px),-10px,0)",
    opacity: show ? 1 : 0,
  });

  useEffect(() => {
    fetch(`${sessionPath}`, {
      headers: {
        siteurl: document.location.origin,
      },
    })
      .then((res) => res.json())
      .then((session) => setSession(session.user));
  }, []);

  return (
    <div className="relative w-max mx-auto" ref={ref}>
      <button
        type="button"
        className={classNames(
          "flex items-center rounded-full text-[#333] text-sm font-semibold outline-none bg-gray-100 dark:bg-slate-600 dark:text-gray-200",
          {
            "p-1": session,
          }
        )}
        onClick={() => setShow(!show)}
      >
        {session?.avatar ? (
          <img
            src={session?.avatar}
            alt={session?.name}
            className="w-6 h-6 rounded-full shrink-0 object-cover"
          />
        ) : (
          <RxAvatar size={32} />
        )}
      </button>
      <animated.ul
        style={style}
        className="mt-1 w-52 absolute shadow-lg bg-white dark:bg-slate-800 py-2 z-[1000] rounded-lg max-h-96 overflow-auto"
      >
        {show &&
          (session ? (
            <>
              <MenuItem
                label="New Story"
                icon={<FiEdit2 size={18} />}
                path="/api/create?type=post"
              />
              <MenuItem
                label="Edit Profile"
                icon={<CgProfile size={18} />}
                path="/profile"
              />
              <MenuItem
                label="Settings"
                icon={<IoSettingsOutline size={18} />}
                path="/settings"
              />
              <MenuItem
                label="Logout"
                icon={<LuLogOut size={18} />}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              />
            </>
          ) : (
            <>
              <MenuItem
                label="SignIn"
                icon={<LuLogIn size={18} />}
                path={`/api/identity/login?source=${document.location.href}`}
              />
              <MenuItem
                label="Get started"
                icon={<VscDebugStart size={18} />}
                path="/register"
              />
            </>
          ))}
      </animated.ul>
    </div>
  );
};

const MenuItem = ({
  label,
  icon,
  path = "#",
  onClick,
}: {
  label: string;
  icon: ReactNode;
  path?: string;
  onClick?: (e: any) => void;
}) => {
  return (
    <li className="py-2.5 px-4  hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100 text-sm cursor-pointer ">
      <Link className="flex items-center gap-2" href={path} onClick={onClick}>
        <span>{icon}</span>
        <span>{label}</span>
      </Link>
    </li>
  );
};
