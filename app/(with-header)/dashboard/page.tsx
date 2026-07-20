import { requireUser } from "../../lib/dal";

export default async function Page() {
  const { name } = await requireUser();
  return <p>{`${name}'s  dashboard`}</p>;
}
