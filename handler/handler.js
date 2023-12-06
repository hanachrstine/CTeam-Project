const homeHandler = (request, h) => {
  return h.view('index', {
    title: 'MoneyMingle - Home',
  });
};

const aboutHandler = (request, h) => {
  return h.view('about', {
    title: 'MoneyMingle - About Us',
  });
};

const loginHandler = (request, h) => {
  return h.view('login', {
    title: 'MoneyMingle - Login',
  });
};

const dashboardHandler = (request, h) => {
  return h.view('dashboard', {
    title: 'MoneyMingle - Dashboard',
  });
};

module.exports = {
  homeHandler,
  aboutHandler,
  loginHandler,
  dashboardHandler,
};
