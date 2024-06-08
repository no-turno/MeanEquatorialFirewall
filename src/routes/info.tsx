type Props = {};

export function Info(props: Props) {
	if (!props) {
		return <p>error</p>;
	}
	return <div className="bg-red-500 h-screen">info</div>;
}

export default Info;
