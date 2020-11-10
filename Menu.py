import PySimpleGUI as sg
from Cart import Item, Cart

sg.ChangeLookAndFeel('GreenTan')

# ------ Menu Definition ------ #
menu_def = [['File', ['Open', 'Save', 'Exit', 'Properties']],
            ['Edit', ['Paste', ['Special', 'Normal', ], 'Undo'], ],
            ['Help', 'About...'], ]

i = Item('Hamburger', 5)
cart=Cart()
cart.add_to_cart(i)
cart.add_to_cart(Item('Fries', 3))

cart.add_to_cart(Item('Drinks', 3))

gui = cart.get_cart_viewable(input=True)

# ------ Column Definition ------ #
column1 = [[sg.Text('Number of Items', background_color='#F7F3EC', justification='center', size=(15, 1))],
            [sg.Spin(values=('Spin Box 1', '2', '3'), initial_value='Spin Box 1')],
            [sg.Spin(values=('Spin Box 1', '2', '3'), initial_value='Spin Box 2')],
            [sg.Spin(values=('Spin Box 1', '2', '3'), initial_value='Spin Box 3')]]

layout = [
    [sg.Menu(menu_def, tearoff=True)],
    [sg.Text('Welcome Back!', size=(30, 1), justification='center', font=("Helvetica", 25), relief=sg.RELIEF_RIDGE)],
    [sg.Text('Please Select one option')],
    [sg.Frame(layout=[
    [sg.Radio('Dine-in     ', "RADIO1", default=True, size=(10,1)), sg.Radio('Takeout', "RADIO1")]], title='Options',title_color='red', relief=sg.RELIEF_SUNKEN, tooltip='Use these to set flags')],
    [sg.Text('Please Add items to cart')]
    , *gui
    ,
    [sg.Text('_'  * 80)],
    [sg.Submit(tooltip='Click to submit this window'), sg.Cancel()]
]


window = sg.Window('ABC Eats', layout, default_element_size=(40, 1), grab_anywhere=False)


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
