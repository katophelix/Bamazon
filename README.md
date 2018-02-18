
MySql Database - Bamazon

Contains a table with avaible products
table is borken down into the following coulumns:

* item_id (unique id for each product)

* product_name (Name of product)

* department_name

* price (cost to customer)

* stock_quantity (how much of the product is available in stores)

* Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

Running node will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

Next node prompts then users with two messages.

The first asks them the ID of the product they would like to buy.
[What item number would you like to buy](/Bamazon/screenshots/ListOfItems.gif)
<!-- ![What item number would you like to buy](/Bamazon/screenshots/ListOfItems.gif) -->
<!-- Format: ![Chossing an item from the list](url) -->

The second message asks how many units of the product they would like to buy.

![What quantity of item number would you like to buy](/Bamazon/screenshots/QuantityWanted.gif)
Format: ![Chossing the quantity of the item from the list](url)

Once the customer has placed the order the application checks if the "store" has enough of the product to meet the customer's request.

If not, a notice of insufficient quatity appears - shown here in red
![There is insufficient quantity of that item](/Bamazon/screenshots/InsufficientQuantity.gif)
Format: ![Therr is insufficient quantity to complete your purchase](url)

if the store does have enough of the product, the customers order is fulfilled and the total cost if shown - shown here in blue
the yellow - shows info for the developer and can be comented out before app is deployed

![Purchasing the item](/Bamazon/screenshots/ProductPurchased.gif)
Format: ![Purchasing the item](url)

the databse is reduced by the number of items sold - here item number 1 is reduced from 12  to 10

![databse is reduced by the number of items sold](/Bamazon/screenshots/AvailQuantityGoesDown.gif)
Format: ![databse is reduced by the number of items sold](url)