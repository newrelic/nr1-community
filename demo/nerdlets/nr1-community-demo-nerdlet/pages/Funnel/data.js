export default {
  accountId: 1606862,
  funnel: {
    event: 'PageView',
    measure: 'session'
  },
  series: [
    {
      label: 'All Users',
      nrqlWhere: "appName = 'WebPortal'"
    },
    {
      label: 'Columbus',
      nrqlWhere: "appName = 'WebPortal' and city = 'Columbus'"
    },
    {
      label: 'Internet Explorer',
      nrqlWhere: "appName = 'WebPortal' and userAgentName = 'IE'"
    }
  ],
  steps: [
    {
      label: 'Homepage',
      nrqlWhere:
        "pageUrl = 'http://webportal.telco.nrdemo.com/' OR pageUrl = 'http://webportal.telco.nrdemo.com/index.html'"
    },
    {
      label: 'Plans',
      nrqlWhere:
        "pageUrl like 'http://webportal.telco.nrdemo.com/browse/plans%'"
    },
    {
      label: 'Cart',
      nrqlWhere: "pageUrl = 'http://webportal.telco.nrdemo.com/shoppingcart'"
    },
    {
      label: 'Checkout',
      nrqlWhere: "pageUrl = 'http://webportal.telco.nrdemo.com/checkout'"
    }
  ]
};
