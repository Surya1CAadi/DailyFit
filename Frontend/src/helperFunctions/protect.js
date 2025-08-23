import { toast } from "react-toastify";

export const protect = (navigate, entity, redirect, tst) => {
  if (!entity && tst) toast(tst, { type: "warning", autoClose: 1000 });
  if (!entity) navigate(redirect || "/login", { replace: true });
};
