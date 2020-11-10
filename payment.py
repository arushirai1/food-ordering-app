import PySimpleGUI as sg
from Cart import Item, Cart
sg.ChangeLookAndFeel('GreenTan')

# ------ Menu Definition ------ #
menu_def = [['File', ['Open', 'Save', 'Exit', 'Properties']],
            ['Edit', ['Paste', ['Special', 'Normal', ], 'Undo'], ],
            ['Help', 'About...'], ]

# ------ Column Definition ------ #
i = Item('Hamburger', 5)
cart=Cart()
cart.add_to_cart(i)
cart.add_to_cart(Item('Fries', 3))

cart.add_to_cart(Item('Drinks', 3))

gui = cart.get_cart_viewable(input=False)

column1 = [[sg.Spin(values=('Spin Box 1', '2', '3'), initial_value='Spin Box 1')],
            [sg.Spin(values=('Spin Box 1', '2', '3'), initial_value='Spin Box 2')],
            [sg.Spin(values=('Spin Box 1', '2', '3'), initial_value='Spin Box 3')]]

layout = [
    [sg.Menu(menu_def, tearoff=True)],
    [sg.Text('Payment Page', size=(30, 1), justification='center', font=("Helvetica", 25), relief=sg.RELIEF_RIDGE)],
    [sg.Text('Please Select payment method')],
    [sg.Frame(layout=[
    [sg.Radio('Cash', "RADIO1", default=True, size=(10,1)), sg.Radio('Card', "RADIO1")]], title='Options',title_color='red', relief=sg.RELIEF_SUNKEN, tooltip='Use these to set flags')],
    [sg.Text('Your Reward points ')
    , sg.InputText('30'), sg.Button('Apply')]
    ,
    [sg.Text('Card Number', auto_size_text=False, justification='right', size = (10,1)),
     sg.InputText('')],
    [sg.Text('Card Holder Name', auto_size_text=False, justification='right', size = (10,1)),
     sg.InputText('')],
    [sg.Text('Expiration Date', auto_size_text=False, justification='right', size = (15,1)),
     sg.InputText('', size = (5,1)),
                                               sg.Text('Security Code (CVV)', auto_size_text=False, justification='right', size = (10,1)),
                                              sg.InputText('', size = (5,1))
    ],
    [sg.Text('Items in Cart', size=(30, 1), justification='center', font=("Helvetica", 18), relief=sg.RELIEF_RIDGE)],
    *gui,
    [sg.Text('_'  * 30)],
    [sg.Text('Price', size=(15, 1), auto_size_text=False, justification='right'),
     sg.InputText('', size = (15,1))],
    [sg.Text('Discounts/Rewards', size=(15, 1), auto_size_text=False, justification='right'),
        sg.InputText('', size = (15,1))],
    [sg.Text('Total Price', size=(15, 1), auto_size_text=False, justification='right'),
        sg.InputText('', size = (15,1))],
    [sg.Submit(tooltip='Click to submit this window'), sg.Cancel()]
]


window = sg.Window('Secured Payment Page', layout, default_element_size=(40, 1), grab_anywhere=False)

def get_name_from_event(event):
    name=""
    for i in event:
        if i == '_':
            break
        name+=i
    return name

while True:
    event, values = window.read()
    print(event, values)
    if event == sg.WIN_CLOSED or event == 'Exit':
        break
    elif event[:4]=="_ADD":
        name = get_name_from_event(event[5:])
        #window.refresh()
        window.FindElement(name).Update(str(int(values[name])+1))

'''
sg.popup('Title',
            'The results of the window.',
            'The button clicked was "{}"'.format(event),
            'The values are', values)

'''

