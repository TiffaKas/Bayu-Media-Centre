self.addEventListener('push', event => {
    const data = event.data.text();
    self.registration.showNotification('私人新闻中心', { body: data });
});
