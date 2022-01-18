import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
  activeClassName: string;
};

export default function ActiveLink({
  children,
  activeClassName,
  ...linkProps
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === linkProps.href ? activeClassName : "";

  return <Link {...linkProps}>{cloneElement(children, { className })}</Link>;
}
