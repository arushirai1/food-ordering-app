import PySimpleGUI as sg
sg.ChangeLookAndFeel('GreenTan')

# ------ Menu Definition ------ #
menu_def = [['File', ['Open', 'Save', 'Exit', 'Properties']],
            ['Edit', ['Paste', ['Special', 'Normal', ], 'Undo'], ],
            ['Help', 'About...'], ]

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
    [sg.Text('Please Select from menu')]
    ,
    [sg.InputOptionMenu(('Menu Option 1', 'Menu Option 2', 'Menu Option 3')), sg.Button('Add')],
    [sg.Text('You Have Selected')],
        [sg.Listbox(values=('Listbox 1', 'Listbox 2', 'Listbox 3'), size=(30, 3)),
     sg.Column(column1, background_color='#F7F3EC')],
    [sg.Text('_'  * 80)],
    [sg.Submit(tooltip='Click to submit this window'), sg.Cancel()]
]


window = sg.Window('Everything bagel', layout, default_element_size=(40, 1), grab_anywhere=False)

event, values = window.read()

window.close()

sg.popup('Title',
            'The results of the window.',
            'The button clicked was "{}"'.format(event),
            'The values are', values)