## Quick Start
---
### RUN BACKEND SERVER
:: country-transaction-map-back-end
#### `npm install`
#### `npm start`
---
After BACK-END server running...

### RUN FRONTEND SERVER
:: country-transaction-map-front-end
#### `npm install`
#### `npm start`
##### Open [http://localhost:3000/#/](http://localhost:3000/) to view it in the browser.
---

### Build Code

#### `npm run build`

Builds the app for production to the `build` folder.

---

## WORK FLOW

```
- Start BackEnd server : `npm start`
- Start FrontEnd server : `npm start`
- FrontEnd Server load countries data from BackEnd using `loadCountries()` when it's start.
- When You click on country code, You can see the modal table and it's show you
  `IP​ ​ SRC​ ​ | ​ ​ IP​ ​ DST​ ​ | ​ ​ COUNTRY​ ​ DST​ ​ | ​ ​ TOTAL​ ​ INTERACTIONS​ ​ | ​ ​ LAST​ ​` INTERACTION it's also include pagination.
- When you close the table, you can see no. of country to country transaction using different colors.
  default Color = "#00b386",
  (i) no_of_country_transaction < 10  =>  Color = "#ff9900";
  (ii) 10 <= no_of_country_transaction < 20  =>  Color = "#4286f4";
  (iii) 20 <= no_of_country_transaction < 30  =>  Color = "#ff0066";
  (iv) 30 <= no_of_country_transaction < 40  =>  Color = "#9900ff";
  (v) no_of_country_transaction >= 40  =>  Color = "#00cc00";
  (vi) selected_country  =>  Color = "red" (if selected_country to selected_country transaction is none)
```
---
