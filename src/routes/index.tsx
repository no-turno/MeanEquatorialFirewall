type Props = {};

export function Index(props: Props) {
	if (!props) {
		return <p>error</p>;
	}
	return <div className="bg-green-500 h-screen">APP</div>;
}

export default Index;
