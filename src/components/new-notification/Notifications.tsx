import React from "react";
import { Container } from "./Styles";
import Notification from "./Notification";
import { RootState } from "../../reduxStore";
import { useSelector } from "react-redux";

const Notifications = () => {
	const notifs = useSelector((state: RootState) => state.notifs.notifs);

	return (
		<Container>
			{notifs.map((notif, i) => (
				<Notification
					key={notif.id}
					name={notif.name}
					online={notif.live}
					index={i}
					total={notifs.length}
					id={notif.id}
				/>
			))}
		</Container>
	);
};

export default Notifications;
