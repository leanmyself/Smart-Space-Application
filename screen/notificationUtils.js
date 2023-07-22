import notifee, { AndroidImportance, AndroidVisibility, AndroidStyle } from '@notifee/react-native';

let currentNotificationId = null;

export async function localDisplayNotification(title, body) {
    if (currentNotificationId) {
        await notifee.cancelNotification(currentNotificationId);
    }

    const channelId = await notifee.createChannel({
        id: 'important',
        name: 'Important Notifications',
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
    });

    const { notificationId } = await notifee.displayNotification({
        title: title,
        body: body,
        android: {
            channelId,
            groupSummary: true,
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,
            timestamp: Date.now(),
            showTimestamp: true,
            color: '#4caf50',
            actions: [
                {
                    pressAction: { id: 'dismiss' },
                    title: 'Dismiss',
                    style: AndroidStyle.SMALL,
                },
            ],
        },
    });

    currentNotificationId = notificationId;

    // Define the background event handler
    notifee.onBackgroundEvent(async ({ type, detail }) => {
        console.log('Background event received', type, detail);
        // Handle background event
    });
}