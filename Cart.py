import PySimpleGUI as sg

class Item:
    def __init__(self, name, quantity=0):
        self.name = name
        self.quantity_selected = quantity
    def get_item_viewable(self, input=True):
        if input:
            return [sg.Button('Add', key=f'_ADD_{self.name}_BUTTON_KEY_'), sg.Button('Delete', key=f'_DELETE_{self.name}_BUTTON_KEY_'), sg.Text(f'{self.name} '), sg.InputText(f'{self.quantity_selected}', key=self.name, readonly=True)]
        else:
            return [sg.Text(f'{self.name} '), sg.InputText(f'Quantity: {self.quantity_selected} ', readonly=True)]


class Cart:
    def __init__(self):
        self.cart_items = []
    def add_to_cart(self, item):
        self.cart_items.append(item)
    def get_cart_viewable(self, input=False):
        return [item.get_item_viewable(input=input) for item in self.cart_items]


#testing

'''
i = Item('Hamburger', 5)
cart=Cart()
cart.add_to_cart(i)
cart.add_to_cart(Item('Fries', 3))

cart.add_to_cart(Item('Drinks', 3))

gui = cart.get_cart_viewable()
window = sg.Window('Next Window', gui )
while True:
    event, values = window.read()
    if event == sg.WIN_CLOSED or event == 'Exit':
        break
'''

