import db from '../db.js'
import {INC} from './getdb.js'

export const LEVELS = [
    0, 25, 50, 100, 200, // 1-5
    350, 800, 1500, 2500, 4000, // 6-10
    7500, 11111, 15000, 22500, 30000, // 11-15
    72727, 100000, 150000, 200000, 250000, // 16-20 
    333333, 555555, 777777, 999999, 1234567 // 21-25
]

export function GETXP(id, gain) {
    INC('users', 'XP', id, gain)
}