'use client';
import { inter, tinos } from '@/app/layout';
import Divider from '@/components/common/Divider';
import React, { useState } from 'react';
import MenuTab from './MenuTab';

function Menu() {
  const [selectedMenu, setSelectedMenu] = useState<
    'Package 1' | 'Package 2' | 'Package 3'
  >('Package 1');

  return (
    <div className="my-40 md:my-60 px-16 md:px-0 flex flex-col justify-center items-center">
      <h2
        className={`${tinos.className} text-center text-2xl md:text-3xl text-secondary`}
      >
        Menu
      </h2>
      <Divider />
      <p
        className={`${inter.className} text-sm md:text-base max-w-700 text-center text-white/80 mx-auto my-20`}
      >
        The events catering Menu is designed to extend ABM Kitchen Management
        Students, to gain experience in their profession. The following menu is
        a guide and some items may change due to seasonal availability or dishes
        students would need to learn to prepare.
      </p>
      <p className={`${tinos.className} text-primary text-lg`}>
        Canapé Package
      </p>
      <div
        className={`${tinos.className} flex w-max align-center gap-2 md:gap-30 mt-40 justify-center text-primary border-b-2 border-neutral-300/10`}
      >
        <MenuTab setSelectedMenu={setSelectedMenu} />
      </div>
      <div className="flex flex-col items-center gap-10 mt-30">
        <p className={`${tinos.className} text-primary`}>
          ${packagesInfo[selectedMenu].price} per person
        </p>
        <p className="text-white/80 text-sm text-center">
          {packagesInfo[selectedMenu].description}
        </p>
      </div>
      <section className="flex gap-40 mt-30 flex-wrap justify-center">
        <div>
          <p className={`${tinos.className} text-primary text-center`}>
            Hot Canapé Selection
            <br />
            $6 per item
          </p>
          <ul className="text-white/90 mt-16">
            {menus.hotCanape.map((item, index) => {
              return (
                <li
                  className={`${inter.className} max-w-270 text-sm gap-10 flex mb-5`}
                  key={item}
                >
                  <span className="font-bold">{index + 1}.</span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className={`${tinos.className} text-primary text-center`}>
            Cold Canapé Selection
            <br />
            $6 per item
          </p>
          <ul className="text-white/90 mt-16">
            {menus.coldCanape.map((item, index) => {
              return (
                <li
                  className={`${inter.className} max-w-270 text-sm gap-10 flex mb-5`}
                  key={item}
                >
                  <span className="font-bold">{index + 1}.</span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className={`${tinos.className} text-primary text-center`}>
            Substantial
            <br />
            $6 per item
          </p>
          <ul className="text-white/90 mt-16">
            {menus.substantial.map((item, index) => {
              return (
                <li
                  className={`${inter.className} max-w-270 text-sm gap-10 flex`}
                  key={item}
                >
                  <span className="font-bold">{index + 1}.</span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className={`${tinos.className} text-primary text-center`}>
            Dessert Canapé
            <br />
            $5 per item
          </p>
          <ul className="text-white/90 mt-16">
            {menus.substantial.map((item, index) => {
              return (
                <li
                  className={`${inter.className} max-w-270 text-sm gap-10 flex mb-5`}
                  key={item}
                >
                  <span className="font-bold">{index + 1}.</span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <Divider />
      <div className="flex flex-col items-center gap-10 mt-20">
        <p className={`${tinos.className} text-primary text-lg text-center`}>
          Grazing board
          <br />
          $30 per item
        </p>
        <p
          className={`${inter.className} text-sm md:text-base max-w-700 text-center text-white/80 mx-auto my-20`}
        >
          Includes a combined selection of sweet and savoury items.
        </p>
      </div>

      <section className="flex gap-40 mt-30 flex-wrap justify-center">
        <div>
          <p className={`${tinos.className} text-primary text-center`}>
            Savory Selection
          </p>
          <ul className="text-white/90 mt-16">
            {grazingBoard.savory.map((item, index) => {
              return (
                <li
                  className={`${inter.className} max-w-270 text-sm gap-10 flex mb-5`}
                  key={item}
                >
                  <span className="font-bold">{index + 1}.</span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className={`${tinos.className} text-primary text-center`}>
            Sweet Selection
          </p>
          <ul className="text-white/90 mt-16">
            {grazingBoard.sweet.map((item, index) => {
              return (
                <li
                  className={`${inter.className} max-w-270 text-sm gap-10 flex mb-5`}
                  key={item}
                >
                  <span className="font-bold">{index + 1}.</span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <Divider />
      <div className="flex flex-col items-center gap-10 mt-20">
        <p className={`${tinos.className} text-primary text-center`}>
          Drink menu
          <br />
          $30 per person
        </p>
      </div>

      <section className="flex gap-40 mt-30 flex-wrap justify-center">
        <div>
          <p className={`${tinos.className} text-primary text-center`}>
            Savory Selection
          </p>
          <ul className="text-white/90 mt-16">
            {drinks.beer.map((item, index) => {
              return (
                <li
                  className={`${inter.className} max-w-270 text-sm gap-10 flex mb-5`}
                  key={item}
                >
                  <span className="font-bold">{index + 1}.</span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className={`${tinos.className} text-primary text-center`}>
            Sweet Selection
          </p>
          <ul className="text-white/90 mt-16">
            {drinks.wine.map((item, index) => {
              return (
                <li
                  className={`${inter.className} max-w-270 text-sm gap-10 flex mb-5`}
                  key={item}
                >
                  <span className="font-bold">{index + 1}.</span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <p className={`${tinos.className} text-primary text-center`}>
            Non-alcoholic drink
          </p>
          <ul className="text-white/90 mt-16">
            {drinks.nonAlchoholic.map((item, index) => {
              return (
                <li
                  className={`${inter.className} max-w-270 text-sm gap-10 flex mb-5`}
                  key={item}
                >
                  <span className="font-bold">{index + 1}.</span>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <span className="text-neutral-400 text-sm mt-20">
        Soft drinks on consumption - no glass ware individual serve
      </span>
      <span className="text-neutral-400 text-sm">
        *BYO Corkage $2.00 per person
      </span>
    </div>
  );
}

export default Menu;

const packagesInfo: {
  [key in 'Package 1' | 'Package 2' | 'Package 3']: {
    price: number;
    description: string;
  };
} = {
  'Package 1': {
    price: 28,
    description: '3 Hot Canapés, 3 Cold Canapés, 1 Substantial, 1 Dessert',
  },

  'Package 2': {
    price: 35,
    description: '4 Hot Canapés, 4 Cold Canapés, 1 Substantial, 2 Desserts',
  },

  'Package 3': {
    price: 42,
    description: '4 Hot Canapés, 4 Cold Canapés, 2 Substantial, 2 Desserts',
  },
};

const menus = {
  hotCanape: [
    'Lamb Kofta with Tzatziki',
    'Moroccan Spiced Lamb Cutlet – additional $2',
    'Truffle Mushroom Arancini',
    'Crab Claw with Sweet Chilli Mayo',
    'Prosciutto Croquettes with Saffron Mayo',
    'Homemade Creamy Mushroom Chicken Pies',
    'Chilli Maple Glazed Southern Fried Chicken',
    'Spring Roll, Samosa, or Curry Puff (Choose One) with Sour Cream & Sweet Chilli Sauce',
    'Homemade Falafel with Tomato Jam',
    'Crispy Skin Pork Belly with Green Apple Slaw',
  ],
  coldCanape: [
    'Smoked Trout Mousse Tart',
    'Smoked Salmon Roulade with Cucumber',
    '38-Degree Confit Trout with Quinoa and Pomegranate',
    'Peking Duck Crostini with Orange',
    'Goat Cheese & Caramelised Leek Tatin',
    'Rolled Sesame Seed Yellowfin Tuna with Pickled Cucumber & Wasabi Mayo',
    'Grilled Tiger Prawns, Avocado, Cos Hearts & Lime Aioli',
    'Torched Scallop with Wakame Salad',
    'Caramelised Fig with Toasted Almond',
    'Blue Swimmer Crab with Celeriac Remoulade on Toasted Brioche Bread',
  ],
  substantial: [
    'Pulled Lamb and Couscous Salad',
    'Thai Beef Noodle Salad Box',
    'Brioche Beef Burger',
    'Brioche Chicken Burger',
    'Christmas Leg Ham with Potato Salad',
    'Creamy Pesto Potato Gnocchi with Seared Prawns and Slow-Cooked Cherry Tomatoes',
  ],
  dessert: [
    'Lemon Curd Tart with Meringue',
    'Chocolate Mousse Tart with Raspberry',
    'Assorted Macarons',
    'Eton Mess',
  ],
};

const grazingBoard = {
  savory: [
    'Sliced Smoked Ham with English Mustard and Pickled Artichokes',
    'Paper-Thin Prosciutto with Lavosh Bread and Pickled Onions',
    'Spanish Frittata with Roasted Red Capsicum and Yogurt',
    'Eggplant and Hummus Dip with Crisp Bread',
    'Smoked Salmon Crostini with Cucumber Relish and Garlic Aioli',
    'Assorted Mini Quiches',
    'Vegetable and Prawn Rice Paper Rolls with Hoisin Dipping Sauce',
    'Mixed Cheese Platter with Crackers and Fresh Grapes',
    'Fruit Platter',
    'Eton Mess Served in Individual Glasses',
  ],
  sweet: [
    'Chocolate Brownies',
    'Baked Scones with Cream and Jam',
    'Fresh Fruit Platter',
  ],
};

const drinks = {
  beer: [
    'Lager - Kirin',
    'Ale - James quire 150 Lashes',
    'Heaps normal no alcoholic beer (non-alcoholic)',
  ],
  wine: [
    'Sparkling wine - De Bortoli Prosecco King Valley',
    'White wine(Pinot Gris) – Squealing-pig Pinot Gris',
    'Red wine(Shiraz) - Penfolds, Koonunga Hill Shiraz',
  ],
  nonAlchoholic: [
    'Soft drinks – Coke, Coke Zero, Lemonade',
    'Sparking water – S.Pellegrino 500ml',
    'Kombucha',
  ],
};
