import { getUserInfo } from "@replit/repl-auth";

export function Index(props: ReturnType<typeof getUserInfo>) {
	if (!props) {
		return <p>error</p>;
	}
	return (
		<div className="bg-blue-500 h-screen">
			<span>{props.id}</span>
			<p className="p-10">{props?.bio}</p>
			<p className="color-blue-400 font-bold">{props.name}</p>
			<p>{props.url}</p>
			<img src={props.profileImage} width={100} />
		</div>
	);
}
