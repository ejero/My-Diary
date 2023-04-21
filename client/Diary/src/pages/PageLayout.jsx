import React, { useEffect } from 'react';
import '../styles/pageLayout.css';
import {
  IconChevronsDown,
} from "@tabler/icons-react";

const PageLayout = () => {
  const checkForScroll = () => {
    const div6 = document.querySelector(".div6")
    if (div6.scrollHeight > div6.clientHeight) {
      div6.style.setProperty("--scroll-icon-opacity", "1");
    }
  }

  useEffect(() => {
    checkForScroll();
  }, [])

  return (
    <div className="parent">
      <div className="div1"> 1 </div>
      <div className="div2"> 2 </div>
      <div className="div3"> 3 </div>
      <div className="div4"> 4 </div>
      <div className="div5"> 5 </div>
      <div className="div6"> 6
        <p>
          Montes cubilia nec gravida vel semper venenatis interdum urna curabitur interdum Orci dictum cubilia aptent enim Mus sociis sodales tristique feugiat vitae et id tortor aenean sollicitudin aptent morbi arcu vel sagittis porttitor porta hendrerit pellentesque. Id praesent ullamcorper inceptos consequat. Tristique. Dolor, sapien nascetur. Congue non eros integer mauris laoreet nec sodales. Donec natoque in lectus sit non justo dolor. Mus nonummy justo blandit phasellus Aliquam sodales amet tristique dictum, iaculis posuere Aliquet lacinia nunc phasellus sagittis imperdiet rhoncus aenean sociosqu varius ridiculus ultricies pulvinar placerat curabitur rhoncus commodo. Ac a, ipsum quis nascetur quis fusce rhoncus facilisis Proin senectus justo interdum nulla egestas facilisi.
        </p>
        <p>
          Tempor. Euismod dictumst. Sit semper mi turpis pulvinar eleifend sociosqu consectetuer. Lacinia tincidunt id suscipit, erat augue dis enim sagittis. Risus fusce adipiscing venenatis, cras feugiat pulvinar cum iaculis fusce ac nonummy hac senectus mi Auctor penatibus. Non. Nascetur pulvinar aptent tempus hac, condimentum netus nunc. Hendrerit rhoncus potenti tortor Nonummy nibh ipsum. Ante curabitur nibh potenti sollicitudin nulla.
        </p>
        <p>
          Aliquet fermentum pellentesque fusce curae; Venenatis mauris enim proin donec lorem ipsum ultricies eget felis, mattis velit ridiculus porta tempor odio porttitor ante cubilia justo viverra lectus tristique est vehicula, lorem cubilia bibendum nonummy sed. Feugiat dictum nostra. Placerat euismod tempor fames velit tellus, velit fusce. Malesuada. Diam rhoncus fusce cum porttitor nunc dis. Egestas nostra nulla. Eget sollicitudin ipsum sociosqu curae; ligula donec pellentesque nec imperdiet et est per nostra scelerisque, pulvinar consequat hendrerit elit commodo. Inceptos.
        </p>
        <p>
          Non mattis eu facilisis ipsum montes suscipit lacinia dolor purus. Gravida ante feugiat ultricies habitant diam hymenaeos libero ornare ultricies. Nec Neque nullam pharetra ridiculus. Cubilia leo sem. Litora adipiscing pellentesque a enim nam bibendum vulputate mi eget aenean mus etiam potenti sagittis convallis mauris dapibus blandit non, cum lobortis nec lacinia potenti cum Blandit venenatis vel. Risus ante viverra fermentum dui. Litora mattis facilisi. Etiam potenti eu duis.
        </p>
        <p>
          Sollicitudin, curabitur odio tempor suscipit, malesuada. Luctus augue consectetuer semper amet praesent nulla. Curabitur diam porta congue dignissim faucibus varius. Sem ridiculus magnis montes phasellus dignissim non nostra donec lacinia. Potenti senectus facilisis torquent potenti aliquam aptent ligula pharetra platea imperdiet tincidunt at suscipit a leo in ut imperdiet taciti bibendum adipiscing amet morbi dictum praesent risus sed odio at sed etiam Massa platea lectus vestibulum facilisi pulvinar fames in conubia accumsan nunc faucibus sodales accumsan. Scelerisque vestibulum donec laoreet libero. Fringilla. Fusce proin nibh Nullam facilisi dolor litora enim habitasse elit ornare porta ac taciti inceptos etiam montes porta libero mattis. Accumsan odio hymenaeos ornare sodales torquent.
        </p>
        <p>
          Non mattis eu facilisis ipsum montes suscipit lacinia dolor purus. Gravida ante feugiat ultricies habitant diam hymenaeos libero ornare ultricies. Nec Neque nullam pharetra ridiculus. Cubilia leo sem. Litora adipiscing pellentesque a enim nam bibendum vulputate mi eget aenean mus etiam potenti sagittis convallis mauris dapibus blandit non, cum lobortis nec lacinia potenti cum Blandit venenatis vel. Risus ante viverra fermentum dui. Litora mattis facilisi. Etiam potenti eu duis.
        </p>
        <p>
          Sollicitudin, curabitur odio tempor suscipit, malesuada. Luctus augue consectetuer semper amet praesent nulla. Curabitur diam porta congue dignissim faucibus varius. Sem ridiculus magnis montes phasellus dignissim non nostra donec lacinia. Potenti senectus facilisis torquent potenti aliquam aptent ligula pharetra platea imperdiet tincidunt at suscipit a leo in ut imperdiet taciti bibendum adipiscing amet morbi dictum praesent risus sed odio at sed etiam Massa platea lectus vestibulum facilisi pulvinar fames in conubia accumsan nunc faucibus sodales accumsan. Scelerisque vestibulum donec laoreet libero. Fringilla. Fusce proin nibh Nullam facilisi dolor litora enim habitasse elit ornare porta ac taciti inceptos etiam montes porta libero mattis. Accumsan odio hymenaeos ornare sodales torquent.
        </p>
        <p>
          Non mattis eu facilisis ipsum montes suscipit lacinia dolor purus. Gravida ante feugiat ultricies habitant diam hymenaeos libero ornare ultricies. Nec Neque nullam pharetra ridiculus. Cubilia leo sem. Litora adipiscing pellentesque a enim nam bibendum vulputate mi eget aenean mus etiam potenti sagittis convallis mauris dapibus blandit non, cum lobortis nec lacinia potenti cum Blandit venenatis vel. Risus ante viverra fermentum dui. Litora mattis facilisi. Etiam potenti eu duis.
        </p>
        <p>
          Sollicitudin, curabitur odio tempor suscipit, malesuada. Luctus augue consectetuer semper amet praesent nulla. Curabitur diam porta congue dignissim faucibus varius. Sem ridiculus magnis montes phasellus dignissim non nostra donec lacinia. Potenti senectus facilisis torquent potenti aliquam aptent ligula pharetra platea imperdiet tincidunt at suscipit a leo in ut imperdiet taciti bibendum adipiscing amet morbi dictum praesent risus sed odio at sed etiam Massa platea lectus vestibulum facilisi pulvinar fames in conubia accumsan nunc faucibus sodales accumsan. Scelerisque vestibulum donec laoreet libero. Fringilla. Fusce proin nibh Nullam facilisi dolor litora enim habitasse elit ornare porta ac taciti inceptos etiam montes porta libero mattis. Accumsan odio hymenaeos ornare sodales torquent.
        </p>
        <p>
          Non mattis eu facilisis ipsum montes suscipit lacinia dolor purus. Gravida ante feugiat ultricies habitant diam hymenaeos libero ornare ultricies. Nec Neque nullam pharetra ridiculus. Cubilia leo sem. Litora adipiscing pellentesque a enim nam bibendum vulputate mi eget aenean mus etiam potenti sagittis convallis mauris dapibus blandit non, cum lobortis nec lacinia potenti cum Blandit venenatis vel. Risus ante viverra fermentum dui. Litora mattis facilisi. Etiam potenti eu duis.
        </p>
        <p>
          Sollicitudin, curabitur odio tempor suscipit, malesuada. Luctus augue consectetuer semper amet praesent nulla. Curabitur diam porta congue dignissim faucibus varius. Sem ridiculus magnis montes phasellus dignissim non nostra donec lacinia. Potenti senectus facilisis torquent potenti aliquam aptent ligula pharetra platea imperdiet tincidunt at suscipit a leo in ut imperdiet taciti bibendum adipiscing amet morbi dictum praesent risus sed odio at sed etiam Massa platea lectus vestibulum facilisi pulvinar fames in conubia accumsan nunc faucibus sodales accumsan. Scelerisque vestibulum donec laoreet libero. Fringilla. Fusce proin nibh Nullam facilisi dolor litora enim habitasse elit ornare porta ac taciti inceptos etiam montes porta libero mattis. Accumsan odio hymenaeos ornare sodales torquent.
        </p>
      </div>
      <div className="div7"> 7 </div>
    </div>
  )
}

export default PageLayout