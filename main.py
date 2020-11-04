import PySimpleGUI as sg

#Constants
WINDOW_SIZE=(200,200)


def next_screen(username):
    window = sg.Window('Next Window',
                       [[sg.T(username)],
                        [sg.B('OK'), sg.B('Skip'), sg.Exit()]], size=WINDOW_SIZE)
    return window

window = sg.Window('Login Window',
                  [[sg.Radio('Guest', "UserType", default=True),
                    sg.Radio("Employee", "UserType"),
                    sg.Radio('Admin', "UserType")],
                  [sg.T('Enter your Login ID'), sg.In(key='-ID-')],
                  [sg.T('Enter your Password'), sg.In(key='-ID2-')],
                  [sg.B('OK'), sg.B('Skip'), sg.Exit()]], size=WINDOW_SIZE)

#this flow will need to be changes when more functions are added
while True:
    event, values = window.read()
    login_id = values['-ID-']
    print(event, values)
    if event == sg.WIN_CLOSED or event == 'Exit':
        break
    elif login_id:
        window.Close()
        window=next_screen(login_id)
