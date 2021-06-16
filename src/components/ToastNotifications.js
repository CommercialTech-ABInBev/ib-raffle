import React, { useContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import { AppContext } from '../Provider';


export function ToastNotifications() {
    const [state, dispatch] = useContext(AppContext);
    let alerts = state.alerts;
    const { addToast } = useToasts();

    React.useEffect(() => {
        if (alerts && alerts.length) {
            alerts.forEach((alert) => {
                addToast(
                    <div>
                        <strong>{alert.title}</strong>
                        <div>{alert.body}</div>
                    </div>
                    , {
                        appearance: alert.type,
                        autoDismiss: true,
                        id: alert.id,
                    });
                setTimeout(() => {
                    dispatch({
                        type: "CLEAR_ALERTS",
                    });
                }, alert.timeout);
            });
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alerts]);
    return null;
}