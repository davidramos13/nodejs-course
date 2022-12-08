// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.get404 = (req: any, res: any, next: any) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
};
