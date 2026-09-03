import Link from "next/link";
import { publicRoutes } from "@/lib/config/routes";

export function DevNav() {
  return (
    <nav aria-label="ناوبری توسعه">
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {publicRoutes.map((route) => (
          <li key={route.path}>
            <Link className="text-ink underline-offset-4 hover:underline" href={route.path}>
              {route.titleFa}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
