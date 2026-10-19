const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const pvp = require('mineflayer-pvp').plugin
const readline = require('readline')
const armorManager = require('mineflayer-armor-manager')

let bot

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//ASCII DU NOM DU PROGRAMME

console.log('')
console.log('[0;36;40m▄[0;93;46m▓▀█[0;93;40m▀[0;93;46m■▄█[0;93;40m▄[0;37;40m [0;93;46m ▀▓[0;37;40m     [0;93;46m░[0;36;40m██▀[0;36;46m [0;93;46m▀■[0;37;40m [0;36;40m███▀[0;93;46m▀▓▒[0;37;40m [0;36;40m███[0;37;40m [0;93;46m▀▓▒[0;37;40m [0;36;40m███▀[0;93;46m▀▓▒[0;37;40m [0;36;40m█[0;93;46m▀▓[0;37;40m [0;36;40m██[0;93;46m■[0;37;40m [0;36;40m█[0;93;46m▀▒[0m')
console.log('[0;36;40m█[0;93;46m▒[0;36;46m█[0;93;46m■[0;37;40m [0;36;40m██[0;93;46m▀▓[0;37;40m [0;96;46m░[0;36;40m██[0;96;46m▄▄▄▄[0;37;40m [0;36;40m███[0;37;40m [0;36;40m▀▀▀[0;37;40m [0;96;46m░[0;36;40m██[0;37;40m [0;36;40m██[0;93;46m░[0;37;40m [0;96;46m░[0;36;40m██[0;37;40m [0;36;40m██[0;93;46m░[0;37;40m [0;96;46m░[0;36;40m██[0;37;40m [0;36;40m██[0;93;46m░[0;37;40m [0;36;40m███[0;37;40m [0;96;46m▒[0;36;40m██[0;37;40m [0;36;40m██[0;93;46m░[0m')
console.log('[0;36;40m█[0;93;46m░[0;36;40m██[0;37;40m [0;36;40m███[0;93;46m▒[0;37;40m [0;96;46m▒[0;36;40m██[0;37;40m [0;96;46m░[0;36;40m█[0;96;46m▓[0;37;40m [0;36;40m▀▀▀▀[0;96;46m░[0;36;40m██[0;37;40m [0;96;46m▒[0;36;40m██[0;37;40m [0;36;40m▀▀▀[0;37;40m [0;96;46m▒[0;36;40m██[0;37;40m [0;96;46m░[0;36;40m█[0;96;46m░[0;37;40m [0;96;46m▒[0;36;40m██[0;37;40m     [0;96;46m░[0;36;40m██[0;37;40m [0;36;40m▄█[0;96;46m■[0;36;40m▀[0;96;46m░[0;36;40m█▄[0m')
console.log('[0;36;40m███[0;96;46m░[0;37;40m [0;36;40m███[0;93;46m▒[0;37;40m [0;96;46m▓▄▐[0;37;40m [0;96;46m▒▄▒[0;37;40m [0;36;40m██[0;96;46m▄[0;37;40m [0;96;46m▒▄░[0;37;40m [0;96;46m▓▄▐[0;37;40m [0;96;46m▒▄■[0;37;40m [0;96;46m▓▄▐[0;37;40m [0;96;46m▒▄■[0;37;40m [0;96;46m▓▄▐[0;37;40m     [0;96;46m▒▄▓[0;37;40m [0;96;46m▓▀▄[0;37;40m [0;96;46m▒■░[0m')
console.log('[0;96;46m░[0;36;40m██[0;96;46m░[0;37;40m [0;96;46m░[0;36;40m██[0;93;46m░[0;37;40m [0;96;46m███[0;96;46m▄[0;96;46m▓█░[0;37;40m [0;96;46m▀█▓[0;96;46m▄[0;96;46m▓█▒[0;37;40m [0;96;46m███[0;96;46m▄[0;96;46m▓█▄[0;37;40m [0;96;46m███[0;96;46m▄[0;96;46m▓█▄[0;37;40m [0;96;46m███[0;37;40m     [0;96;46m▓██[0;37;40m [0;96;46m██▓[0;37;40m [0;96;46m▓█▓[0m')
console.log('[0;96;46m▒■ ▒[0;37;40m [0;96;46m▒[0;36;40m██[0;96;46m▒[0;37;40m                             [0m')
console.log('[0;96;46m▓▄█▒[0;37;40m [0;96;46m▓[0;36;46m▄[0;96;46m■▐[0;37;40m                             [0m')
console.log('[0;96;46m█▄█▓[0;37;40m [0;96;46m█▄██[0;37;40m                             [0m')
console.log('[0;96;40m▀[0;96;46m███[0;96;40m▄[0;96;46m███[0;96;40m▀[0;37;40m                             [0m')
console.log('')

//QUESTION

rl.question('-IP du serveur : ', (ipSaisie) => {
  rl.question('-Port du serveur: ', (portSaisie) => {
    rl.question('-Nom du bot : ', (usernameSaisie) => {
      rl.question('-Version du serveur : ', (versionSaisie) => {
            console.log('')
            console.log('Connexion au serveur...')
            console.log('')

            const botOptions = {
              host: ipSaisie.trim(),
              port: parseInt(portSaisie) || 25565,
              username: usernameSaisie.trim(),
              version: versionSaisie.trim(),
              auth: 'offline',
    }

            bot = mineflayer.createBot(botOptions)

            bot.loadPlugin(pathfinder)
            bot.loadPlugin(pvp)
            bot.loadPlugin(armorManager)

//SPAWN + ACTION DU BOT

            bot.once('spawn', () => {
              console.log('Connecté en tant que ' + bot.username)
              console.log('')
              console.log('================================')
              //COMMANDE POUR LES SERVEURS CRACK
              bot.chat("/register eee222X& eee222X&")
              bot.chat("/login eee222X&")
            })

            bot.on('message', (jsonMsg) => {
              console.log('[CHAT]', jsonMsg.toAnsi())
            })

//PVP

            bot.on('playerCollect', (collector, itemDrop) => {
              if (collector !== bot.entity) return

              setTimeout(() => {
                const sword = bot.inventory.items().find(item => item.name.includes('sword'))
                if (sword) bot.equip(sword, 'hand')
              }, 150)
            })

            bot.on('playerCollect', (collector, itemDrop) => {
              if (collector !== bot.entity) return
              
              setTimeout(() => {
                const shield = bot.inventory.items().find(item => item.name.includes('shield'))
                if (shield) bot.equip(shield, 'off-hand')
              }, 250)
            })



//PVP + COMMANDE

            rl.on('line', (texte) => {
              const ligneBrute = texte.trim()
              const args = ligneBrute.split(' ')
              const commande = args[0]
              const cibleNom = args[1]

              if (commande === '!pvp') {
                if (!cibleNom) {
                  console.log('[ATTENTION] !pvp <pseudo>')
                  return
                }

                const player = bot.players[cibleNom]
                if (!player || !player.entity) {
                  console.log('[ERREUR] Le joueur est trop loin ou introuvable.')
                  return
                }

                console.log(`[PVP] Attaque de ${cibleNom}`)
                bot.pvp.attack(player.entity)
              }
              else if (commande === '!stop') {
                console.log('[PVP] Le PvP est désactivé.')
                bot.pvp.stop()
              }    
              else if (ligneBrute.startsWith('!')) {
                console.log('[ERREUR] Commande inconnue.')
              }   
              else {
                bot.chat(ligneBrute)
              }
            })

            bot.on('physicsTick', () => {
              if (bot.pvp.target) return
              if (bot.pathfinder.isMoving()) return

              const entity = bot.nearestEntity()
              if (entity) bot.lookAt(entity.position.offset(0, entity.height, 0))
            })

//KICK + RAISON

            bot.on('kicked', (reason, loggedIn) => {
              console.log(`${bot.username} a été kické : `, reason, loggedIn)
              process.exit(0)
            })

//ERREUR + RAISON

            bot.on('error', err => {
              console.log('[ERREUR]', err.message)
              process.exit(0)
            })

      })
    })
  })
})

process.on('SIGINT', () => {
  if (bot) {
    bot.quit()
  }
  process.exit(0)
})