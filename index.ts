import 'dotenv/config';
import {
  InworldClient,
  InworldPacket,
} from '@inworld/nodejs-sdk';

async function sayHello() {
  const client = new InworldClient()
    // Get key and secret from the integrations page.
    .setApiKey({
      key: process.env.INWORLD_KEY!,
      secret: process.env.INWORLD_SECRET!,
    })
    // Setup a user name.
    // It allows character to call you by name.
    .setUser({ fullName: 'Marco' })
    // Setup required capabilities.
    // In this case you can receive character emotions.
    .setConfiguration({
      capabilities: { audio: true, emotions: true, phonemes: true },
    })
    // Use a full character name.
    // It should be like workspaces/{WORKSPACE_NAME}/characters/{CHARACTER_NAME}.
    // Or like workspaces/{WORKSPACE_NAME}/scenes/{SCENE_NAME}.
    .setScene(process.env.INWORLD_SCENE!)
    // Attach handlers
    .setOnError((err: Error) => console.error(err))
    .setOnMessage((packet: InworldPacket) => {
      //console.log(packet);

      if (packet.isAudio()) {
        packet.audio.additionalPhonemeInfo?.forEach(phoneme => console.log(phoneme));
      }

      if (packet.isInteractionEnd()) {
        // Close connection.
        connection.close();
      }
    });

  // Finish connection configuration.
  const connection = client.build();

  // Send your message to a character.
  await connection.sendText('Hello');
}

sayHello();
