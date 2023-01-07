import "package:flutter/material.dart";
import 'package:provider/provider.dart';
import 'package:tic_tac_toe/provider/room_data_provider.dart';
import 'package:tic_tac_toe/resources/socket_methods.dart';
import 'package:tic_tac_toe/widgets/waiting_lobby.dart';

class GameScreen extends StatefulWidget {
  static String routeName = "/game-screen";
  const GameScreen({super.key});

  @override
  State<GameScreen> createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen> {
  var _socketMethods = SocketMethods();
  @override
  void initState() {
    super.initState();
    _socketMethods.updateRoomListener(context);
    _socketMethods.updatePlayersStateListener(context);
  }

  @override
  Widget build(BuildContext context) {
    var roomDataProvider = Provider.of<RoomDataProvider>(context);
    return Scaffold(
      body: roomDataProvider.getRoomData["isJoin"]
          ? const WaitingLobby()
          : Center(
              child: Text(
                Provider.of<RoomDataProvider>(context).getRoomData.toString(),
              ),
            ),
    );
  }
}
