import axios from 'axios';

export async function urlTest(url: string, defaultUrl?: string): Promise<{ typeUrl: string; url: string }> {
  return axios
    .get(url)
    .then(() => ({ url: url, typeUrl: 'correct' }))
    .catch(() => {
      if (defaultUrl) {
        return { url: defaultUrl, typeUrl: 'default' };
      } else {
        return {
          url: gastronomyArray[Math.floor(Math.random() * gastronomyArray.length)],
          typeUrl: 'incorrect',
        };
      }
    });
}

const gastronomyArray = [
  './assets/gastronomy/apple-1.png',
  './assets/gastronomy/apple.png',
  './assets/gastronomy/asparagus.png',
  './assets/gastronomy/aubergine.png',
  './assets/gastronomy/avocado.png',
  './assets/gastronomy/bacon.png',
  './assets/gastronomy/baguette.png',
  './assets/gastronomy/banana.png',
  './assets/gastronomy/beans.png',
  './assets/gastronomy/biscuit.png',
  './assets/gastronomy/blueberries.png',
  './assets/gastronomy/boiled.png',
  './assets/gastronomy/bowl-1.png',
  './assets/gastronomy/bowl.png',
  './assets/gastronomy/bread-1.png',
  './assets/gastronomy/bread-2.png',
  './assets/gastronomy/bread.png',
  './assets/gastronomy/broccoli.png',
  './assets/gastronomy/butcher.png',
  './assets/gastronomy/butter.png',
  './assets/gastronomy/cabbage.png',
  './assets/gastronomy/cake.png',
  './assets/gastronomy/can-1.png',
  './assets/gastronomy/can-2.png',
  './assets/gastronomy/can.png',
  './assets/gastronomy/candy-1.png',
  './assets/gastronomy/candy.png',
  './assets/gastronomy/carrot.png',
  './assets/gastronomy/cauliflower.png',
  './assets/gastronomy/cereals.png',
  './assets/gastronomy/cheese-1.png',
  './assets/gastronomy/cheese.png',
  './assets/gastronomy/chef.png',
  './assets/gastronomy/cherries.png',
  './assets/gastronomy/chili.png',
  './assets/gastronomy/chips.png',
  './assets/gastronomy/chives.png',
  './assets/gastronomy/chocolate.png',
  './assets/gastronomy/coconut.png',
  './assets/gastronomy/coffee-1.png',
  './assets/gastronomy/coffee-2.png',
  './assets/gastronomy/coffee-3.png',
  './assets/gastronomy/coffee-4.png',
  './assets/gastronomy/coffee-maker.png',
  './assets/gastronomy/coffee.png',
  './assets/gastronomy/cookies.png',
  './assets/gastronomy/corckscrew.png',
  './assets/gastronomy/corn.png',
  './assets/gastronomy/corndog.png',
  './assets/gastronomy/croissant.png',
  './assets/gastronomy/cucumber.png',
  './assets/gastronomy/cup.png',
  './assets/gastronomy/cupcake-1.png',
  './assets/gastronomy/cupcake-2.png',
  './assets/gastronomy/cupcake.png',
  './assets/gastronomy/cutlery.png',
  './assets/gastronomy/dairy.png',
  './assets/gastronomy/dish.png',
  './assets/gastronomy/dishes.png',
  './assets/gastronomy/doughnut-1.png',
  './assets/gastronomy/doughnut-2.png',
  './assets/gastronomy/doughnut.png',
  './assets/gastronomy/egg.png',
  './assets/gastronomy/eggs.png',
  './assets/gastronomy/fig.png',
  './assets/gastronomy/fish.png',
  './assets/gastronomy/flour-1.png',
  './assets/gastronomy/flour.png',
  './assets/gastronomy/food.png',
  './assets/gastronomy/fork.png',
  './assets/gastronomy/frappe.png',
  './assets/gastronomy/fries.png',
  './assets/gastronomy/garlic.png',
  './assets/gastronomy/gingerbread.png',
  './assets/gastronomy/glass-1.png',
  './assets/gastronomy/glass-2.png',
  './assets/gastronomy/glass-3.png',
  './assets/gastronomy/glass-4.png',
  './assets/gastronomy/glass-5.png',
  './assets/gastronomy/glass-6.png',
  './assets/gastronomy/glass.png',
  './assets/gastronomy/grain.png',
  './assets/gastronomy/grapes.png',
  './assets/gastronomy/grater.png',
  './assets/gastronomy/grinder.png',
  './assets/gastronomy/groceries.png',
  './assets/gastronomy/ham.png',
  './assets/gastronomy/hamburguer-1.png',
  './assets/gastronomy/hamburguer.png',
  './assets/gastronomy/hazelnut.png',
  './assets/gastronomy/honey-1.png',
  './assets/gastronomy/honey.png',
  './assets/gastronomy/hot-dog-1.png',
  './assets/gastronomy/hot-dog.png',
  './assets/gastronomy/ice-cream-1.png',
  './assets/gastronomy/ice-cream-10.png',
  './assets/gastronomy/ice-cream-11.png',
  './assets/gastronomy/ice-cream-12.png',
  './assets/gastronomy/ice-cream-13.png',
  './assets/gastronomy/ice-cream-14.png',
  './assets/gastronomy/ice-cream-2.png',
  './assets/gastronomy/ice-cream-3.png',
  './assets/gastronomy/ice-cream-4.png',
  './assets/gastronomy/ice-cream-5.png',
  './assets/gastronomy/ice-cream-6.png',
  './assets/gastronomy/ice-cream-7.png',
  './assets/gastronomy/ice-cream-8.png',
  './assets/gastronomy/ice-cream-9.png',
  './assets/gastronomy/ice-cream.png',
  './assets/gastronomy/jam-1.png',
  './assets/gastronomy/jam.png',
  './assets/gastronomy/jawbreaker.png',
  './assets/gastronomy/jelly.png',
  './assets/gastronomy/kebab-1.png',
  './assets/gastronomy/kebab-2.png',
  './assets/gastronomy/kebab.png',
  './assets/gastronomy/kitchen.png',
  './assets/gastronomy/knife-1.png',
  './assets/gastronomy/knife-2.png',
  './assets/gastronomy/knife-3.png',
  './assets/gastronomy/knife.png',
  './assets/gastronomy/knives.png',
  './assets/gastronomy/ladle.png',
  './assets/gastronomy/lemon-1.png',
  './assets/gastronomy/lemon.png',
  './assets/gastronomy/lime.png',
  './assets/gastronomy/meat-1.png',
  './assets/gastronomy/meat-2.png',
  './assets/gastronomy/meat.png',
  './assets/gastronomy/milk-1.png',
  './assets/gastronomy/milk.png',
  './assets/gastronomy/mixer.png',
  './assets/gastronomy/mug.png',
  './assets/gastronomy/mushroom.png',
  './assets/gastronomy/mushrooms.png',
  './assets/gastronomy/mustard-1.png',
  './assets/gastronomy/mustard-2.png',
  './assets/gastronomy/mustard.png',
  './assets/gastronomy/noodles.png',
  './assets/gastronomy/oat.png',
  './assets/gastronomy/octopus.png',
  './assets/gastronomy/oil.png',
  './assets/gastronomy/olives.png',
  './assets/gastronomy/onion-1.png',
  './assets/gastronomy/onion.png',
  './assets/gastronomy/orange.png',
  './assets/gastronomy/ornating.png',
  './assets/gastronomy/pan.png',
  './assets/gastronomy/pancakes-1.png',
  './assets/gastronomy/pancakes.png',
  './assets/gastronomy/pasta-1.png',
  './assets/gastronomy/pasta.png',
  './assets/gastronomy/peach.png',
  './assets/gastronomy/pear.png',
  './assets/gastronomy/peas.png',
  './assets/gastronomy/pepper-1.png',
  './assets/gastronomy/pepper.png',
  './assets/gastronomy/pickles.png',
  './assets/gastronomy/pie-1.png',
  './assets/gastronomy/pie-2.png',
  './assets/gastronomy/pie.png',
  './assets/gastronomy/pineapple.png',
  './assets/gastronomy/pint.png',
  './assets/gastronomy/pistachio.png',
  './assets/gastronomy/pizza-1.png',
  './assets/gastronomy/pizza-2.png',
  './assets/gastronomy/pizza-3.png',
  './assets/gastronomy/pizza-4.png',
  './assets/gastronomy/pizza-5.png',
  './assets/gastronomy/pizza.png',
  './assets/gastronomy/pomegranate.png',
  './assets/gastronomy/popsicle.png',
  './assets/gastronomy/pot-1.png',
  './assets/gastronomy/pot-2.png',
  './assets/gastronomy/pot.png',
  './assets/gastronomy/potatoes-1.png',
  './assets/gastronomy/potatoes-2.png',
  './assets/gastronomy/potatoes.png',
  './assets/gastronomy/pretzel.png',
  './assets/gastronomy/pudding.png',
  './assets/gastronomy/pumpkin.png',
  './assets/gastronomy/radish.png',
  './assets/gastronomy/raspberry.png',
  './assets/gastronomy/rice.png',
  './assets/gastronomy/risotto.png',
  './assets/gastronomy/rolling-pin.png',
  './assets/gastronomy/salad-1.png',
  './assets/gastronomy/salad.png',
  './assets/gastronomy/salami.png',
  './assets/gastronomy/salmon.png',
  './assets/gastronomy/salt.png',
  './assets/gastronomy/sandwich-1.png',
  './assets/gastronomy/sandwich.png',
  './assets/gastronomy/sausage.png',
  './assets/gastronomy/scale.png',
  './assets/gastronomy/seeds.png',
  './assets/gastronomy/shrimp.png',
  './assets/gastronomy/slotted-spoon.png',
  './assets/gastronomy/sorbet.png',
  './assets/gastronomy/spaguetti.png',
  './assets/gastronomy/spatula-1.png',
  './assets/gastronomy/spatula.png',
  './assets/gastronomy/spices.png',
  './assets/gastronomy/spoon.png',
  './assets/gastronomy/steak.png',
  './assets/gastronomy/stew-1.png',
  './assets/gastronomy/stew.png',
  './assets/gastronomy/strainer.png',
  './assets/gastronomy/strawberry.png',
  './assets/gastronomy/sushi-1.png',
  './assets/gastronomy/sushi-2.png',
  './assets/gastronomy/sushi.png',
  './assets/gastronomy/taco.png',
  './assets/gastronomy/tea-1.png',
  './assets/gastronomy/tea.png',
  './assets/gastronomy/teapot-1.png',
  './assets/gastronomy/teapot.png',
  './assets/gastronomy/teaspoon.png',
  './assets/gastronomy/tenderizer.png',
  './assets/gastronomy/thermos.png',
  './assets/gastronomy/toast.png',
  './assets/gastronomy/toaster.png',
  './assets/gastronomy/toffee.png',
  './assets/gastronomy/tomato.png',
  './assets/gastronomy/turkey.png',
  './assets/gastronomy/water-1.png',
  './assets/gastronomy/water.png',
  './assets/gastronomy/watermelon.png',
  './assets/gastronomy/whisk.png',
  './assets/gastronomy/wrap.png',
];
